import * as actions from '../js/actions/index';

// Async Action Tests

describe('getHaikus', () => {
  it('should dispatch getHaikusSuccess', () => {
    const haikus = [{}, {}, {}];
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return haikus;
        },
      }),
    );
    const dispatch = jest.fn();
    const userId = '123456789';
    return actions.getHaikus(userId)(dispatch).then((data) => {
      expect(fetch).toHaveBeenCalledWith(`/api/haikus/${userId}`);
      expect(dispatch).toHaveBeenCalledWith(actions.getHaikusSuccess(haikus));
    });
  });
});


describe('saveHaiku', () => {
  it('should dispatch saveHaikusSuccess', () => {
    const haiku = {
      userId: 'mYfZ9Hgll6THExWMQ6SiL5dxYG82',
      haikuText: 'y y y y y // y y y y y y y // y y y y y',
      date: 'Sat Jun 10 2017 14:02:18 GMT-0700 (PDT)',
    };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      }),
    );
    const dispatch = jest.fn();
    return actions.saveHaiku(haiku)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(actions.saveHaikuSuccess());
    });
  });
});

describe('saveEditHaiku', () => {
  it('should dispatch saveEditHaikusSuccess', () => {
    const haiku = {
      userId: 'mYfZ9Hgll6THExWMQ6SiL5dxYG82',
      haikuText: 'y edit y // y y y y y edit y // y y y y y',
      date: 'Sat Jun 10 2017 14:02:18 GMT-0700 (PDT)',
    };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      }),
    );
    const dispatch = jest.fn();
    return actions.saveEditHaiku(haiku)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(actions.saveEditHaikuSuccess());
    });
  });
});

describe('deleteHaiku', () => {
  it('should dispatch deleteHaikuSuccess', () => {
    const haikuId = '123456789';
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      }),
    );
    const dispatch = jest.fn();
    return actions.deleteHaiku(haikuId)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(actions.deleteHaikuSuccess());
    });
  });
});
