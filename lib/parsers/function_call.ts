import XPathLexer from "xpath-lexer";

import { ExprNode, ExprParser } from "./expr";

import { FUNCTION_CALL } from "../expr_type";

import { isValid } from "../validators/function_name";

import { FunctionName } from "../function_name";

export interface FunctionNode {
  type: typeof FUNCTION_CALL;
  name: FunctionName;
  args: ExprNode[];
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): FunctionNode {
  var functionName = lexer.peak() as string;

  if (!isValid(functionName)) {
    //PF: our usage means we don't actually want to prevent unknown functions here
    //throw new Error("Invalid function at position " + lexer.position());
  }

  lexer.next();

  var functionCall: FunctionNode = {
    type: FUNCTION_CALL,
    name: functionName,
    args: []
  };

  lexer.next();

  if (lexer.peak() === ")") {
    lexer.next();
  } else {
    while (lexer.peak() !== ")") {
      functionCall.args.push(rootParser.parse(lexer));

      if (lexer.peak() === ",") {
        lexer.next();
      }
    }

    lexer.next();
  }

  return functionCall;
}
