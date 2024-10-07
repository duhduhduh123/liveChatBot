import * as assert from 'assert';
import { replaceWords, splitWords, wordsContain, joinWords, substitute } from './words';


describe('words', function() {

  it('substitute', function() {
    // TODO: (part 1c) add tests here
    const phrase = new Map([["b", "c"], ["hi", "hello"], ["yo", "gang"],
     ["toodle", "bye"], ["hot", "cold"], ["black", "white"]])
    // Empty List
    let sub1: string[] = [];
    substitute(sub1, phrase);
    assert.deepStrictEqual(sub1, []);

    // 1 Size List - No Key in Map
    let sub2: string[] = ["sup"];
    substitute(sub2, phrase);
    assert.deepStrictEqual(sub2, ["sup"]);

    // 1 Size List
    let sub3: string[] = ["b"];
    substitute(sub3, phrase);
    assert.deepStrictEqual(sub3, ["c"]);

    // 1 Size List
    let sub4: string[] = ["hi"];
    substitute(sub4, phrase);
    assert.deepStrictEqual(sub4, ["hello"]);

    // >1 Size List
    let sub5: string[] = ["yo", "toodle"];
    substitute(sub5, phrase);
    assert.deepStrictEqual(sub5, ["gang", "bye"]);

    // >1 Size List
    let sub6: string[] = ["black", "hot", "b"];
    substitute(sub6, phrase);
    assert.deepStrictEqual(sub6, ["white", "cold", "c"]);

  });

  it('replaceWords', function() {
    const repl = new Map([["a", ["a", "b", "c"]], ["d", ["e", "f"]]]);
    assert.deepStrictEqual(replaceWords([], repl), []);
    assert.deepStrictEqual(replaceWords(["the"], repl), ["the"]);
    assert.deepStrictEqual(replaceWords(["a"], repl), ["a", "b", "c"]);
    assert.deepStrictEqual(replaceWords(["the", "a", "dog"], repl),
        ["the", "a", "b", "c", "dog"]);
    assert.deepStrictEqual(replaceWords(["the", "a", "dog", "d"], repl),
        ["the", "a", "b", "c", "dog", "e", "f"]);
  });

  it('splitWords', function() {
    assert.deepStrictEqual(splitWords(""), []);
    assert.deepStrictEqual(splitWords(" "), []);
    assert.deepStrictEqual(splitWords("."), ["."]);
    assert.deepStrictEqual(splitWords("a"), ["a"]);
    assert.deepStrictEqual(splitWords("abc"), ["abc"]);
    assert.deepStrictEqual(splitWords("ab,"), ["ab", ","]);
    assert.deepStrictEqual(splitWords("ab,c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("ab ,c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("ab, c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("ab , c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("a b , c"), ["a", "b", ",", "c"]);
    assert.deepStrictEqual(splitWords("abc, def! gh"), ["abc", ",", "def", "!", "gh"]);
    assert.deepStrictEqual(splitWords("abc def  gh"), ["abc", "def", "gh"]);
  });

  it('wordsContain', function() {
    assert.strictEqual(wordsContain([], ["a"]), -1);
    assert.strictEqual(wordsContain(["a", "b"], ["a"]), 0);
    assert.strictEqual(wordsContain(["c", "a", "b"], ["a"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "c", "d"], ["d"]), 3);
    assert.strictEqual(wordsContain(["c", "a", "d", "c", "e"], ["a"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "d", "c", "e"], ["f"]), -1);

    assert.strictEqual(wordsContain([], ["a", "b"]), -1);
    assert.strictEqual(wordsContain(["a", "b"], ["a", "b"]), 0);
    assert.strictEqual(wordsContain(["c", "a", "b"], ["a", "b"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "c", "d"], ["a", "c"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "d", "c", "e"], ["a", "c"]), -1);

    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["a", "b", "c"]), 0);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["a", "b", "d"]), -1);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["b", "c", "d"]), 1);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["b", "c", "a"]), -1);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["c", "d", "e"]), 2);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["c", "d", "c"]), -1);

    assert.strictEqual(wordsContain(["A", "B", "C", "D", "E"], ["c", "d", "e"]), 2);
    assert.strictEqual(wordsContain(["A", "B", "C", "D", "E"], ["c", "d", "c"]), -1);
  });

  it('joinWords', function() {
    assert.strictEqual(joinWords([]), "");
    assert.strictEqual(joinWords(["a"]), "a");
    assert.strictEqual(joinWords([","]), ",");
    assert.strictEqual(joinWords(["a", "!"]), "a!");
    assert.strictEqual(joinWords(["a", "b"]), "a b");
    assert.strictEqual(joinWords(["abc", "def"]), "abc def");
    assert.strictEqual(joinWords(["a", ",", "b"]), "a, b");
    assert.strictEqual(joinWords(["a", ",", "b", "c", "!"]), "a, b c!");
    assert.strictEqual(joinWords(["a", ",", "b", "c", "!", "d"]), "a, b c! d");
    assert.strictEqual(joinWords(["what", "?", "!", "?"]), "what?!?");
  });

});