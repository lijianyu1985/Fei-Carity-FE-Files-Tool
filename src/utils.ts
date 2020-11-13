// DirPath转换成./dir/path
export const trans2Path = (input: string) => input.replace(/^([A-Z])/g, word => '/' + word.charAt(0).toLowerCase() + word.substr(1))
    .replace(/([A-Z])/g, word => '.' + word.charAt(0).toLowerCase() + word.substr(1));
