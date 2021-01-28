import jp from 'jsonpath';
import { JsonPath, Specification } from 'app/types';

/**
 * @description Returns object from spec, found by path; jsonpath library always returns array, but really
 * it can be array or not.
 * @param spec - Specification to query
 * @param path - Json Path, targeting to object
 */
export const getObjectFromSpec = (spec: Specification | unknown, path: JsonPath): unknown => {
  const queryResult = jp.nodes(spec, path);
  if (queryResult.length > 1) {
    return queryResult.map(({ value }) => value);
  }
  return queryResult[0].value;
};


/*
  When we have to do with array?

  # yaml:
  servers:
    - url: http://localhost:4000


  ## OPERATION: query

  QUERY: '$.servers'
  RESULT [
    [{url: "http://localhost:4000"}]
  ]

  QUERY: $.servers[*].url
  RESULT: ["http://localhost:4000"]

  ##
  ## OPERATION: nodes
  ##

  QUERY: '$.servers'
  RESULT: [
    {
      "value":[
        {
            "url":"http://localhost:4000"
        }
      ],
      "path":[ "$", "servers" ]
    }
  ]

  QUERY: '$.servers[*].url
  RESULT: [
    {
      "value":"http://localhost:4000",
      "path":[
        "$",
        "servers",
        0,
        "url"
      ]
    }
  ]


  # YAML:
  servers:
    - url: http://localhost:4000
    - url: https://google.com


  ## OPERATION: query

  QUERY: $.servers
  RETURNS
  [
    [
      {
        "url":"http://localhost:4000"
      },
      {
        "url":"https://google.com"
      }
    ]
  ]

  QUERY: $.servers[*].url
  RETURNS ["http://localhost:4000", "https://google.com"]

  ## OPERATION: nodes

  QUERY: $.servers
  RETURNS [
    {
      "value":[
        {
            "url":"http://localhost:4000"
        },
        {
            "url":"https://google.com"
        }
      ],
      "path":[
        "$",
        "servers"
      ]
    }
  ]

  QUERY: $.servers[*].url
  RETURNS
  [
    {
        "value":"http://localhost:4000",
        "path":[
          "$",
          "servers",
          0,
          "url"
        ]
    },
    {
        "value":"https://google.com",
        "path":[
          "$",
          "servers",
          1,
          "url"
        ]
    }
  ]
*/
