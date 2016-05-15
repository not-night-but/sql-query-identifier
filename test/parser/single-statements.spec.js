import { expect } from 'chai';

import { aggregateUnkownTokens } from '../spec-helper';
import { parse } from '../../src/parser';

/* eslint prefer-arrow-callback: 0 */
describe('parser', function () {
  describe('given is a not reconized statement', function () {
    it('should throw an error including the unkown statement', function () {
      let hasError = false;
      try {
        parse('LIST * FROM Persons');
      } catch (err) {
        expect(err.message).to.eql('Invalid statement parser "LIST"');
        hasError = true;
      }
      expect(hasError).to.eql(true);
    });
  });

  describe('given queries with a single statement', function () {
    it('should parse "SELECT" statement', function () {
      const actual = parse('SELECT * FROM Persons');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 20,
        body: [ // nodes
          {
            type: 'SELECT',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'SELECT', start: 0, end: 5 },
          { type: 'unkown', value: ' * FROM Persons', start: 6, end: 20 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "select" statement', function () {
      const actual = parse('select * FROM Persons');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 20,
        body: [ // nodes
          {
            type: 'SELECT',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'select', start: 0, end: 5 },
          { type: 'unkown', value: ' * FROM Persons', start: 6, end: 20 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "CREATE TABLE" statement', function () {
      const actual = parse('CREATE TABLE Persons (PersonID int, Name varchar(255));');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 54,
        body: [ // nodes
          {
            type: 'CREATE_TABLE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'CREATE', start: 0, end: 5 },
          { type: 'whitespace', value: ' ', start: 6, end: 6 },
          { type: 'keyword', value: 'TABLE', start: 7, end: 11 },
          { type: 'unkown', value: ' Persons (PersonID int, Name varchar(255))', start: 12, end: 53 },
          { type: 'semicolon', value: ';', start: 54, end: 54 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "CREATE DATABASE" statement', function () {
      const actual = parse('CREATE DATABASE Profile;');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 23,
        body: [ // nodes
          {
            type: 'CREATE_DATABASE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'CREATE', start: 0, end: 5 },
          { type: 'whitespace', value: ' ', start: 6, end: 6 },
          { type: 'keyword', value: 'DATABASE', start: 7, end: 14 },
          { type: 'unkown', value: ' Profile', start: 15, end: 22 },
          { type: 'semicolon', value: ';', start: 23, end: 23 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "DROP TABLE" statement', function () {
      const actual = parse('DROP TABLE Persons;');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 18,
        body: [ // nodes
          {
            type: 'DROP_TABLE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'DROP', start: 0, end: 3 },
          { type: 'whitespace', value: ' ', start: 4, end: 4 },
          { type: 'keyword', value: 'TABLE', start: 5, end: 9 },
          { type: 'unkown', value: ' Persons', start: 10, end: 17 },
          { type: 'semicolon', value: ';', start: 18, end: 18 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "DROP DATABASE" statement', function () {
      const actual = parse('DROP DATABASE Profile;');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 21,
        body: [ // nodes
          {
            type: 'DROP_DATABASE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'DROP', start: 0, end: 3 },
          { type: 'whitespace', value: ' ', start: 4, end: 4 },
          { type: 'keyword', value: 'DATABASE', start: 5, end: 12 },
          { type: 'unkown', value: ' Profile', start: 13, end: 20 },
          { type: 'semicolon', value: ';', start: 21, end: 21 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "INSERT" statement', function () {
      const actual = parse('INSERT INTO Persons (PersonID, Name) VALUES (1, \'Jack\');');
      actual.tokens = aggregateUnkownTokens(actual.tokens);
      const expected = {
        type: 'QUERY',
        start: 0,
        end: 55,
        body: [ // nodes
          {
            type: 'INSERT',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'INSERT', start: 0, end: 5 },
          { type: 'unkown', value: ' INTO Persons (PersonID, Name) VALUES (1, \'Jack\')', start: 6, end: 54 },
          { type: 'semicolon', value: ';', start: 55, end: 55 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "UPDATE" statement', function () {
      const actual = parse('UPDATE Persons SET Name = \'John\' WHERE PersonID = 1;');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 51,
        body: [ // nodes
          {
            type: 'UPDATE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'UPDATE', start: 0, end: 5 },
          { type: 'unkown', value: ' Persons SET Name = \'John\' WHERE PersonID = 1', start: 6, end: 50 },
          { type: 'semicolon', value: ';', start: 51, end: 51 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "DELETE" statement', function () {
      const actual = parse('DELETE FROM Persons WHERE PersonID = 1;');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 38,
        body: [ // nodes
          {
            type: 'DELETE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'DELETE', start: 0, end: 5 },
          { type: 'unkown', value: ' FROM Persons WHERE PersonID = 1', start: 6, end: 37 },
          { type: 'semicolon', value: ';', start: 38, end: 38 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('should parse "TRUNCATE" statement', function () {
      const actual = parse('TRUNCATE TABLE Persons;');
      actual.tokens = aggregateUnkownTokens(actual.tokens);

      const expected = {
        type: 'QUERY',
        start: 0,
        end: 22,
        body: [ // nodes
          {
            type: 'TRUNCATE',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'TRUNCATE', start: 0, end: 7 },
          { type: 'whitespace', value: ' ', start: 8, end: 8 },
          { type: 'keyword', value: 'TABLE', start: 9, end: 13 },
          { type: 'unkown', value: ' Persons', start: 14, end: 21 },
          { type: 'semicolon', value: ';', start: 22, end: 22 },
        ],
      };

      expect(actual).to.eql(expected);
    });
  });
});
