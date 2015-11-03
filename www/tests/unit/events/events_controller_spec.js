describe('Events Controller', function() {
  var events, $controller, $scope;

  beforeEach(module('events_controller'));
  beforeEach(module('events_service'));
  beforeEach(module('current_user_service'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    events = {
      query: function() {
        return 'events';
      }
    }
    $scope = {};
    spyOn(events, 'query').and.returnValue('events');

    $controller(
      'EventsCtrl',
      { 'Events': events, $scope: $scope }
    );
  }));

  it('queries events', function() {
    expect(events.query).toHaveBeenCalled();
  });

  it('assigns $scope.events to the right value', function() {
    expect($scope.events).toEqual('events');
  });
});
