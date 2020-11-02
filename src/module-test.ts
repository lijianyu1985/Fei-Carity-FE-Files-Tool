import * as fs from 'fs';

import { findInterface } from './findInterface';
import { parseInterfaceDefinitions } from './parseTypeAnnotation';
import { transCode2Ast } from './transCode2Ast';

const IGNORE_KEY = ['Key', 'MetadataKey'];

export class ModuleTest {
    // 1. 获取文件内容
    public exportResult() {
        fs.readFile('../templates/model/grievance-appeal-index-model.ts', 'utf-8', (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            const fileContent = res;
            let ast = transCode2Ast(fileContent);
            let interfaces = findInterface(ast);
            
            let definations = Object.keys(interfaces).reduce((a, c) => {
                a[c] = a[c] || [];
                a[c].push(parseInterfaceDefinitions(interfaces[c]));

                return a;
            }, Object.create(null));

            console.log('fileContent: \n', JSON.stringify(definations));

            return definations;
        });
    }
}

const mt = new ModuleTest();
mt.exportResult();
