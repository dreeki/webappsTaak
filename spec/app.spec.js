var Request = require("request");

describe("Server", () => {
  let userId;
  let userName;
  let firstThreadId;
  let firstSubThreadId;
  beforeAll(() => {});
  afterAll(() => {});
  describe("GET /API/users/:username", () => {
    var data = {};
    beforeAll((done) => {
      Request.get("http://localhost:4200/API/users/dreeki", (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.id).toBeDefined();
      expect(data.body.username).toBe('dreeki');
      expect(data.body.firstname).toBe('Andreas');
      expect(data.body.lastname).toBe('De Witte');
      expect(data.body.country).toBe('Belgica');
      userId = data.body.id;
      userName = data.body.username;
    });
  });
  describe("GET /API/threads", () => {
    var data = {};
    beforeAll((done) => {
      Request.get("http://localhost:4200/API/threads", (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.length).toBe(1);
    });
  });
  describe("POST /API/threads/:username", () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'POST',
        uri: 'http://localhost:4200/API/threads/' + userName,
        json: true,
        body: {
          title: "mijn titel",
          description: "mijn description",
          user: {
            id : userId,
            country : "Belgica",
            lastname : "De Witte",
            firstname : "Andreas",
            username : userName
          }
        }
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
    });
    it("status 200", () => {
      expect(data.status).toBe(200);
    });
    it("check body", () => {
      expect(data.body.title).toBe("mijn titel");
      expect(data.body.description).toBe("mijn description");
      expect(data.body.user.username).toBe("dreeki");
      expect(data.body.id).toBeDefined();
      firstThreadId = data.body.id;
    });
  });
  describe("GET /API/threads", () => {
    var data = {};
    beforeAll((done) => {
      Request.get("http://localhost:4200/API/threads", (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.length).toBe(2);
    });
  });
  describe("POST /API/threads/:username/addsubthread/:id", () => {
    let data = {};
    beforeAll((done) => {
      Request({
        method: 'POST',
        uri: 'http://localhost:4200/API/threads/' + userName + '/addsubthread/' + firstThreadId,
        json: true,
        body: {
          description: "mijn subdescription",
          user: {
            id : userId,
            country : "Belgica",
            lastname : "De Witte",
            firstname : "Andreas",
            username : userName
          }
        }
      }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
    });
    it("status 200", () => {
      expect(data.status).toBe(200);
    });
    it("check body", () => {
      expect(data.body.title).toBe("mijn titel");
      expect(data.body.description).toBe("mijn description");
      expect(data.body.id).toBeDefined(firstThreadId);
      expect(data.body.subThreads.length).toBe(1);
      expect(data.body.subThreads[0].description).toBe("mijn subdescription");
      expect(data.body.subThreads[0].user.username).toBe(userName);
      expect(data.body.subThreads[0].id).toBeDefined();
      firstSubThreadId = data.body.subThreads[0].id;
    });
  });
  describe("DELETE /API/threads/delete/subthread/:id", () => {
    var data = {};
    beforeAll((done) => {
      Request.delete(`http://localhost:4200/API/threads/delete/subthread/${firstSubThreadId}`, (error, response, body) => {
        data.status = response.statusCode;
        done();
      }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });
  describe("GET /API/threads/:id", () => {
    var data = {};
    beforeAll((done) => {
      Request.get("http://localhost:4200/API/threads/" + firstThreadId, (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.subThreads.length).toBe(0);
      expect(data.body.title).toBe('mijn titel');
      expect(data.body.description).toBe('mijn description');
    });
  });
  describe("DELETE /API/threads/delete/thread/:id", () => {
    var data = {};
    beforeAll((done) => {
      Request.delete(`http://localhost:4200/API/threads/delete/thread/${firstThreadId}`, (error, response, body) => {
        data.status = response.statusCode;
        done();
      }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
  });
  describe("GET /API/threads", () => {
    var data = {};
    beforeAll((done) => {
      Request.get("http://localhost:4200/API/threads", (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it("Status 200", () => {
      expect(data.status).toBe(200);
    });
    it("Body", () => {
      expect(data.body.length).toBe(1);
    });
  });
});
