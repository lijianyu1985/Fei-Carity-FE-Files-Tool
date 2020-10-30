// 4. 分析TypeAnnotation
const get = require("lodash/get");

export const parseTSTypeReference = (typeName: any) => {
	const type = get(typeName, "type");
	switch (type) {
		case "TSQualifiedName":
			return `${get(typeName, "left.name")}.${get(typeName, "right.name")}`;
		default:
			return typeName.name;
	}
};

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

export const parseTypeAnnotation = (typeAnnotation: any) => {
	const type = get(typeAnnotation, "type");

	switch (type) {
		case "TSNumberKeyword":
		case "TSStringKeyword":
		case "TSBoleanKeyword":
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

export const parseInterfaceDefinitions = (nodePaths: any) => {
	const parseInterfaceDefinationsNode = (nodePath: any) => {
		const name = get(nodePath, "key.name");
		const typeAnnotation = get(nodePath, "typeAnnotation.typeAnnotation");
		const type = parseTypeAnnotation(typeAnnotation);

		return { parameter: name, type };
	};

	return nodePaths.map(parseInterfaceDefinationsNode);
};

export const parseTSTypeLiteral = (members: any) => {
	const ret = parseInterfaceDefinitions(members);
	let args = ret.map((t: any) => `${t.name}: ${t.type}`);

	return "{ " + args.join(", ") + " }";
};
