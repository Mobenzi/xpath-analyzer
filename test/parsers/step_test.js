import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { ATTRIBUTE, CHILD, PARENT, SELF } from "../../lib/axis_specifier";

import { NUMBER } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

import * as Expr from "../../lib/parsers/expr";

import * as Step from "../../lib/parsers/step";

describe("Step", function () {
  describe("parse()", function () {
    it("should parse steps not containing an axis", function () {
      var ast = Step.parse(Expr, new XPathLexer("foo"));

      Assert.deepEqual(ast, {
        axis: CHILD,
        test: {
          name: "foo"
        }
      });
    });

    it("should parse steps containing an axis", function () {
      var ast = Step.parse(Expr, new XPathLexer("parent::foo"));

      Assert.deepEqual(ast, {
        axis: PARENT,
        test: {
          name: "foo"
        }
      });
    });

    it("should throw upon unknown axis", function () {
      Assert.throws(function () {
        Step.parse(Expr, new XPathLexer("bar::foo"));
      });
    });

    it("should parse the abbreviated axis specifier @", function () {
      var ast = Step.parse(Expr, new XPathLexer("@foo"));

      Assert.deepEqual(ast, {
        axis: ATTRIBUTE,
        test: {
          name: "foo"
        }
      });
    });

    it("should parse the abbreviated axis specifier ..", function () {
      var ast = Step.parse(Expr, new XPathLexer(".."));

      Assert.deepEqual(ast, {
        axis: PARENT,
        test: {
          type: NODE
        }
      });
    });

    it("should parse the abbreviated axis specifier .", function () {
      var ast = Step.parse(Expr, new XPathLexer("."));

      Assert.deepEqual(ast, {
        axis: SELF,
        test: {
          type: NODE
        }
      });
    });

    it("should parse steps containing predicates", function () {
      var ast = Step.parse(Expr, new XPathLexer("*[1]"));

      Assert.deepEqual(ast, {
        axis: CHILD,
        test: {
          name: "*"
        },
        predicates: [{
          type: NUMBER,
          number: 1
        }]
      });
    });
  });
});
