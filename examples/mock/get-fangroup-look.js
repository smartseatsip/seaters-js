var shared = require('./_shared');

shared.client.publicService.getFanGroupLookBySlug('a-public-fg')
  .then(fgLook => console.log(fgLook))
  .then(shared.exitOK, shared.exitFail);
