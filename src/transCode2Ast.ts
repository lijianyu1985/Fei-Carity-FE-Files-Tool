// 2. 将文件内容转换成ast
const parser = require('@babel/parser');

export const transCode2Ast: any = (code: string) => {
    return parser.parse(code, {
        sourceType: 'module',
        plugins: [
            'typescript'
        ]
    });
}
