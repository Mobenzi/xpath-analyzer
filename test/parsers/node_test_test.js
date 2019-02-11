import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { NODE_NAME_TEST, NODE_TYPE_TEST, PROCESSING_INSTRUCTION_TEST } from "../../lib/expr_type";

import { TEXT } from "../../lib/node_type";

import * as Expr from "../../lib/parsers/expr";

import * as NodeTest from "../../lib/parsers/node_test";

describe("NodeTest", function () {
  describe("parse()", function () {
    it("should parse node tests containing a name test", function () {
      var ast = NodeTest.parse(Expr, new XPathLexer("foo"));

      Assert.deepEqual(ast, {
        type: NODE_NAME_TEST,
        name: "foo"
      });
    });

    it("should parse node tests containing an abbreviated name test *", function () {
      var ast = NodeTest.parse(Expr, new XPathLexer("*"));

      Assert.deepEqual(ast, {
        type: NODE_NAME_TEST,
        name: "*"
      });
    });

    it("should parse node tests containing a type test", function () {
      var ast = NodeTest.parse(Expr, new XPathLexer("text()"));

      Assert.deepEqual(ast, {
        type: NODE_TYPE_TEST,
        name: TEXT
      });
    });

    it("should parse node tests containing a type test with a literal", function () {
      var ast = NodeTest.parse(Expr, new XPathLexer("processing-instruction('foo')"));

      Assert.deepEqual(ast, {
        type: PROCESSING_INSTRUCTION_TEST,
        name: "foo"
      });
    });

    it("should throw upon unknown node type", function () {
      Assert.throws(function () {
        NodeTest.parse(Expr, new XPathLexer("foo()"));
      });
    });
  });
});
