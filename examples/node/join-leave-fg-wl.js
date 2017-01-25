var fgId = '30034395-e3e0-48f9-9ba6-9762b1c4697c';
var wlId = 'b52eb117-a7e7-4ede-b0ee-b3523c92592f';

var SeatersSDK = require('../../dist/seaters.module.js');
console.log('SeatersSDK v%s\n----------------\n', SeatersSDK.version);

var client = new SeatersSDK.SeatersClient({ requestDriver: 'NODE' });

client.sessionService.doEmailPasswordLogin('test@test.com', 'test')
.then(() => client.fanGroupService.getFanGroup(fgId))
.then(fg => {
    if(fg.membership.member) {
        return fg;
    } else {
        return client.fanGroupService.joinFanGroup(fgId);
    }
})
.then(() => client.waitingListService.getWaitingList(wlId))
.then(wl => {
    if(wl.position) {
        return wl.position;
    } else {
        return client.waitingListService.joinWaitingList(wlId, 1);
    }
})
.then(() => client.waitingListService.leaveWaitingList(wlId))
.then(() => client.fanGroupService.leaveFanGroup(fgId))
.then(
    () => console.log('Join FG - Join WL - Leave WL - Leave FG :: Success'),
    (err) => console.error('Fail', err)
);