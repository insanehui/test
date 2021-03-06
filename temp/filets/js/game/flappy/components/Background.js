import img from './background.png'

let BG_WIDTH
const background = new Image()
background.src = img
background.onload = ()=>{
  BG_WIDTH = background.width
}

export default ctx => ({world}) =>{
  if ( !BG_WIDTH ) {
    return
  } 
  const {canvas:{width}} = ctx
  for(var i = 0; i < Math.ceil(width / BG_WIDTH) + 1; i++){
    ctx.drawImage(background, i*BG_WIDTH - Math.floor(world.x % BG_WIDTH), 0)
  }
}
