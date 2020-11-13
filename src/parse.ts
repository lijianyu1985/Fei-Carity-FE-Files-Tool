const get = require("lodash/get");

export const parseTypeAnnotation = (typeAnnotation: any) => {
	const type = get(typeAnnotation, "type");

	switch (type) {
		case "TSNumberKeyword":
		case "TSStringKeyword":
		case "TSBooleanKeyword":
		case "TSNullKeyword":
		case "TSUndefinedKeyword":
		case "TSSymbolKeyword":
		case "TSAnyKeyword":
			return type.match(/TS(\w+)Keyword/)[1].toLowerCase();
		case "TSUnionType":
			return get(typeAnnotation, "types", [])
				.map((type: any) => get(type, "literal.value"))
				.join(" | ");
		case "TSFunctionType":
			return parseTSFunctionType(
				get(typeAnnotation, "parameters"),
				get(typeAnnotation, "typeAnnotation.typeAnnotation")
			);
		case "TSTypeReference":
			return parseTSTypeReference(get(typeAnnotation, "typeName"));
		case "TSTypeLiteral":
			return parseTSTypeLiteral(get(typeAnnotation, "members"));
		default:
			return "UnKnowType";
	}
};

export const isBasicType = (type: string) => {
    switch (type) {
        case "number":
        case "string":
        case "boolean":
        case "null":
        case "undefined":
        case "symbol":
        case "any":
            return true;
        default:
            return false;
    }
}

export const parseTSFunctionType = (parameters: any, typeAnnotation: any) => {
	const parseTSFunctionParameters = (parameters: any) => {
		if (!parameters || !parameters.length) {
			return `()`;
		}
		let args = parameters.map((parameter: any) => {
			return `${get(parameter, "name")}: ${parseTypeAnnotation(
				get(parameter, "typeAnnotation.typeAnnotation")
			)}`;
		});
		return "( " + args.join(", ") + ")";
	};
	const parseTSFunctionReturn = (typeAnnotation: any) => {
		const type = get(typeAnnotation, "type");
		switch (type) {
			case "TSVoidKeyword":
				return "void";
			case "TSTypeReference":
				return parseTSTypeReference(get(typeAnnotation, "typeName"));
			default:
				return `Unknown FunctionType`;
		}
	};
	return `${parseTSFunctionParameters(parameters)} => ${parseTSFunctionReturn(
		typeAnnotation
	)}`;
};

export const parseTSTypeReference = (typeName: any) => {
	const type = get(typeName, "type");
	switch (type) {
		case "TSQualifiedName":
			return `${get(typeName, "left.name")}.${get(typeName, "right.name")}`;
		default:
			return typeName.name;
	}
};

export const parseTSTypeLiteral = (members: any) => {
	const ret = parseInterfaceDefinitions(members);
	let args = ret.map((t: any) => `${t.name}: ${t.type}`);

	return "{ " + args.join(", ") + " }";
};

export const parseInterfaceDefinitions = (nodePaths: any) => {
	const parseInterfaceDefinationsNode = (nodePath: any) => {
		const name = get(nodePath, "key.name");
		const typeAnnotation = get(nodePath, "typeAnnotation.typeAnnotation");
		const type = parseTypeAnnotation(typeAnnotation);

		return { parameter: name, type };
	};

	return nodePaths.map(parseInterfaceDefinationsNode);
};
