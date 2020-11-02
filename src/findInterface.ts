// 3. 遍历ast
const { visit } = require('ast-types');

export const findInterface: any = (ast: any) => {
    let result = Object.create(null);
    let currentInterface: any = null;

    visit(ast, {
        visitTSInterfaceDeclaration(nodePath: any) {
            currentInterface = nodePath.value.id.name;
            this.traverse(nodePath);
          },
          visitTSPropertySignature(nodePath: any) {
            result[currentInterface] = result[currentInterface] || [];
            result[currentInterface].push(nodePath.value);
            return false;
          }
    });

    return result;
}
