var assert = require("assert")
var viewport = require("../build/js/viewport.js")
describe('viewport', function(){
	describe('cordinates', function(){
		it('should start at 0,0 when launched', function(){
			assert.equal(0, viewport.center.x)
			assert.equal(0, viewport.center.y)
		});
		it('should return last setCenter', function(){
			viewport.setCenter(9,5);
			assert.equal(9, viewport.center.x)
			assert.equal(5, viewport.center.y)
		})
		it('should return the center based on a corner', function(){
			viewport.setCorner(9,5);
			assert.equal(10, viewport.center.x)
			assert.equal(6, viewport.center.y)
		})
		it('should start widht 3,3 size when launched', function(){
			assert.equal(3, viewport.size.width)
			assert.equal(3, viewport.size.height)
		})
		it('should return return last setSize', function(){
			viewport.setSize(5,9);
			assert.equal(5, viewport.size.width)
			assert.equal(9, viewport.size.height)
		})
		it('should error if either setSize input is even', function(){
			assert.throws(function(){viewport.setSize(4,7)}, '/Size/');
			assert.throws(function(){viewport.setSize(7,4)}, '/Size/');
		})
		it('should return a position on the viewport based on map position', function(){
			viewport.center.x = 5
			viewport.center.y = 5
			viewport.size.width = 5
			viewport.size.height = 5
			assert.equal(-3, viewport.getViewportX(2))
			assert.equal(-3, viewport.getViewportY(2))
		});
		it('should start with 32x32 tile size', function(){
			assert.equal(32, viewport.tile.width);
			assert.equal(32, viewport.tile.height);
		});
	});
	describe('pixelmap', function(){
		it('should start with 32x32 tile size', function(){
			assert.equal(32, viewport.tile.width);
			assert.equal(32, viewport.tile.height);
		});
		it('should return viewport pixels based on tile', function(){
			viewport.tile.width = 64
			assert.equal(128, viewport.getPixelX(1))
			assert.equal(32, viewport.getPixelY(0))
		});
	});
});
