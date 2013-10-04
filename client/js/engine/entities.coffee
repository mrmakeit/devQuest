root = window ? exports
root.engine = root.engine ? {}
class Entity
  constructor: (@engine) ->
    @x = 0
    @y = 0   
    @frames = {}
    @scripts = {}
    @animations = {}
  setXY: (x,y) ->
    @x = x;
    @y = y;
    return
    
  addFrame: (id,sprite) ->
    @frames[id]=sprite;
    return
  
  addScript: (id,script) ->
    @scripts[id]=script;
    return
  
  move: (dir) ->
    switch dir
      when 'up' then @y++
      when 'down' then @y--
      when 'left' then @x--
      when 'left' then @x++
    if dir is not 'undefined'
      @animate(dir,0)
  
  currentXY: ->
    return {x:@x,y:@y}
  animate: (id,step) ->
    @moving = @animations[id][step].moving;
    offsetX = @animations[id][step].offsetX;
    offsetY = @animations[id][step].offsetY;
    @setCurrentFrame(@animations[id][step].frame)
    @engine.nextStep(@animate(id,step++))
  
  draw: ->
    x = @x
    y = @y
    offsetX = @offsetX
    offsetY = @offsetY
    @engine.viewport.draw(x,y,@getCurrentFrame(),offsetX,offsetY)
  
  setCurrentFrame: (id) ->
    @currentFrame=id
  
  getCurrentFrame: ->
    return @currentFrame
  
  execScript: (id,params...) ->
    @scripts[id](@,params...)

  buildFromJSON: (object) ->
    scripts = object.scripts
    frames = object.frames
    for script,data of scripts
      @addScript(script,data)
    for frame,data of frames
      @addFrame(frame,data)
    @setXY(object.x,object.y)
    if(object.initFrame) then @setCurrentFrame(object.initFrame)
    
root.engine.Entity = Entity

