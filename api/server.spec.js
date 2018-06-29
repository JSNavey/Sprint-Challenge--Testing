const mongoose = require('mongoose');
const request = require('supertest'); 
const server = require('./server');

const Game = require('../games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId, testGame;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks

    testGame =  { 
      title: 'California Games', 
      genre: 'Sports', 
      releaseDate: 'June 1987'
    };
    const saveGame = await Game.create(testGame);
    gameId = testGame._id;
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here

  it('should return status 201 if post new game successfully', async () => {
    const newGame = await request(server).post('/api/games').send(testGame);
    const expectedStatusCode = 201;

    expect(newGame.status).toEqual(expectedStatusCode);
  })

  it('should check if the post is object', async () => {
    const newGame = await request(server).post('/api/games').send(testGame);

    expect(typeof newGame).toBe('object');
  })

  it('should return title, genre and release date', async () => {
    const newGame = await request(server).post('/api/games').send(testGame);

    expect(newGame.body.title).toEqual('California Games');  //req.body
    expect(newGame.body.genre).toEqual('Sports');
    expect(newGame.body.releaseDate).toEqual('June 1987');
  })

  // test the GET here

  // Test the DELETE here
});
