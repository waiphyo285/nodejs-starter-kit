const swgDocs = {
  "openapi": "3.0.3",
  "info": {
    "title": "ITemplate - OpenAPI 3.0",
    "description": "This is a sample ITemplate Server based on the OpenAPI 3.0 specification.",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "email": "waiphyo.dev@gmail.com"
    },
    "version": "1.0.11"
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  },
  "servers": [
    {
      "url": "http://localhost:6060"
    }
  ],
  "tags": [
    {
      "name": "Token",
      "description": "Prebuild token for all your requests",
      "externalDocs": {
        "description": "Find out more",
        "url": "#"
      }
    },
    {
      "name": "Student",
      "description": "Everything about student data",
      "externalDocs": {
        "description": "Find out more",
        "url": "#"
      }
    }
  ],
  "paths": {
    "/d-mar/u-tsh": {
      "post": {
        "tags": ["Token"],
        "operationId": "hashTime",
        "summary": "Hash time first to generate token",
        "description": "Hash time first to generate token",
        "requestBody": {
          "description": "Hash time first to generate token",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Timehash"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Timehash"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Timehash"
              }
            }
          },
          "required": true
        },
        "responses": {}
      }
    }
  },
  "components": {
    "schemas": {
      "Timehash": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "example": "9E0HU8L48"
          },
          "password": {
            "type": "string",
            "example": "123098321"
          },
          "method_id": {
            "type": "string",
            "example": "two",
            "enum": ["one", "two"]
          },
          "userrole": {
            "type": "string",
            "example": "admin",
            "enum": ["admin", "manager", "staff"]
          }
        },
        "xml": {
          "name": "timehash"
        }
      },
      "Response token": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "description": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "token": {
            "type": "string"
          }
        },
        "xml": {
          "name": "default"
        }
      },
      "Response object": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "description": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "object"
          }
        },
        "xml": {
          "name": "default"
        }
      },
      "Response array": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "description": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "array"
          }
        },
        "xml": {
          "name": "default"
        }
      }
    },
    "requestBodies": {
      "Timehash": {
        "description": "Hash time request body example",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Timehash"
            }
          },
          "application/xml": {
            "schema": {
              "$ref": "#/components/schemas/Timehash"
            }
          }
        }
      }
    }
  }
};

module.exports = { swgDocs };

