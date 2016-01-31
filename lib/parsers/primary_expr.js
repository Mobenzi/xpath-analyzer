"use strict";

var ExprType = require("../expr_type");

var NodeTypeValidator = require("../validators/node_type");

var FunctionCall = require("./function_call");

module.exports = {
  parse: function (rootParser, lexer) {
    var token = lexer.peak(),
        ch = token && token[0];

    if (ch === "(") {
      lexer.next();

      var expr = rootParser.parse(lexer);

      if (lexer.peak() === ")") {
        lexer.next();
      } else {
        throw new Error("Invalid token at position " + lexer.position() + ", expected closing parenthesis");
      }

      return expr;
    }

    if (ch === "\"" || ch === "'") {
      lexer.next();

      return {
        type: ExprType.LITERAL,
        string: token.slice(1, -1)
      };
    }

    if (ch === "$") {
      throw Error("Variable reference are not implemented");
    }

    if (/^\d+$/.test(token) || /^(\d+)?\.\d+$/.test(token)) {
      lexer.next();

      return {
        type: ExprType.NUMBER,
        number: parseFloat(token)
      };
    }

    if (lexer.peak(1) === "(" && !NodeTypeValidator.isValid(lexer.peak())) {
      return FunctionCall.parse(rootParser, lexer);
    }
  },

  isValidOp: function (lexer) {
    var token = lexer.peak(),
        ch = token && token[0];

    return ch === "(" ||
      ch === "\"" ||
      ch === "'" ||
      ch === "$" ||
      /^\d+$/.test(token) ||
      /^(\d+)?\.\d+$/.test(token) ||
      (lexer.peak(1) === "(" && !NodeTypeValidator.isValid(lexer.peak()));
  }
};
