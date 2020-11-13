import * as fs from 'fs';
import { visit } from 'ast-types';
const get = require("lodash/get");

import { parseTypeAnnotation, isBasicType } from './parse';
import { trans2Path } from './utils';

/**
 * 
 * @param filePath 待解析文件路径
 * @param dirname 子级待解析文件路径
 * @param ext 待解析文件名后缀
 */
async function generateParseJson(filePath, dirname, ext) {
    // 1. 读取文件内容
    const fc = await fileContent(filePath, 'utf-8');
    // 2. 将文件内容转换成ast
    const ast = await transCode2Ast(fc);
    // 3. 遍历ast
    const moduleAst = await findModuleAst(ast);
    // 4. 分析TypeAnnotation, 拆分module里面数据
    const parseAst = await breakModuleAst(moduleAst);
    // 5. 遍历拆分后的结果，进行第二次分析
    let result = [];
    for (let key in parseAst) {
        for (const curAst of parseAst[key]) {
            if (!isBasicType(curAst.type)) {
                let obj = {};
                let path = dirname + trans2Path(curAst.type) + ext;
                // 1. 读取文件内容
                const cfc = await fileContent(path, 'utf-8');
                // 2. 将文件内容转换成ast
                const cast = await transCode2Ast(cfc);
                // 3. 遍历ast
                const cmast = await findModuleAst(cast);
                // 4. 分析TypeAnnotation, 拆分module里面数据
                const childAst = await breakModuleAst(cmast);
                // 5. 组装数据
                obj['name'] = curAst.name;
                obj['reference'] = childAst[curAst.type];
                result.push(obj);
            }
            else {
                result.push(curAst);
            }
        }
    }
    // 6. 写入文件
    fs.writeFile('./parse-result.json', JSON.stringify(result), err => {})
}

generateParseJson('./examples/index.module.ts', './examples', '.ts');

// 1. 读取文件内容
function fileContent(input, encoding) {
    return new Promise(( resolve, reject ) => {
        fs.readFile(input, encoding, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

// 2. 将文件内容转换成ast
async function transCode2Ast(code) {
    return require('@babel/parser').parse(code, {
        sourceType: 'module',
        plugins: [
            'typescript',
            ['decorators', { decoratorsBeforeExport: true }]
        ]
    });
}

// 3. 遍历ast
async function findModuleAst(ast) {
    // 初始化
    let result = Object.create(null);
    let currentInterface = null;

    visit(ast, {
        // Interface declaration
        visitTSInterfaceDeclaration(nodePath) {
            currentInterface = nodePath.value.id.name;
            
            this.traverse(nodePath);
        },
        // Properties
        visitTSPropertySignature(nodePath) {
            result[currentInterface] = result[currentInterface] || [];
            result[currentInterface].push(nodePath.value);

            return false;
        }
    });

    return result;
}

// 4. 分析TypeAnnotation
function parseInterfaceDefinitions(nodePath) {
    const name = get(nodePath, 'key.name');
    const typeAnnotation = get(nodePath, 'typeAnnotation.typeAnnotation');
    const type = parseTypeAnnotation(typeAnnotation);

    return { name, type };
}

// 拆分module里面数据
async function breakModuleAst(data) {
    let definations = {};
    for (let key in data) {
        let section = data[key];
        definations[key] = section.map(item => {
            return parseInterfaceDefinitions(item);
        });
    }

    return definations;
}
