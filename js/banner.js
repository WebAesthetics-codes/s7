$(document).ready(function () {
  let gltf = null
  let mixer = null
  let clock = new THREE.Clock()
  let controls
  let camera

  init()
  animate()

  function init () {
    // Render size to match the browser
    width = window.innerWidth
    height = window.innerHeight

    // Create new scene
    scene = new THREE.Scene()

    // Lighting setup
    let ambient = new THREE.AmbientLight(0xffffff)
    scene.add(ambient)
    const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 8)
    light.position.set(10, 25, 45)
    light.castShadow = true
    scene.add(light)

    // Camera setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 10000)
    camera.position.set(0, -10, 30)
    let geometry = new THREE.BoxGeometry(100, 5, 100)
    let material = new THREE.MeshLambertMaterial({
      color: '#999999'
    })

    let manager = new THREE.LoadingManager()
    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total)
    }

    let loader = new THREE.GLTFLoader()
    loader.setCrossOrigin('anonymous')

    let scale = 20
    let url = './images/glb/S7_Disepersion.glb'
    //let url = 'images/glb/gg-animated5.glb'

    loader.load(url, function (data) {
      gltf = data
      let object = gltf.scene
      object.scale.set(scale, scale, scale)
      object.position.y = 0
      object.position.x = 0
      object.position.z = 0
      object.castShadow = true
      object.receiveShadow = true

      let animations = gltf.animations
      if (animations && animations.length) {
        mixer = new THREE.AnimationMixer(object)
        for (let i = 0; i < animations.length; i++) {
          let animation = animations[i]
          mixer.clipAction(animation).play()
        }
      }
      scene.add(object)
    })

    // Create renderer and include antialiasing to smoothen edges
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    //renderer.setClearColor(0xD0D3D4);
    renderer.shadowMap.enabled = true

    // Allow user to orbit around object
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.userPan = false
    controls.userPanSpeed = 0.0
    controls.maxDistance = 5000.0
    controls.maxPolarAngle = Math.PI * 0.495
    //controls.autoRotate = true;
    controls.autoRotate = true
    controls.autoRotateSpeed = -1.0

    renderer.setSize(width, height)
    renderer.gammaOutput = true
    //document.body.appendChild(renderer.domElement);
    document
      .getElementById('animation-container')
      .appendChild(renderer.domElement)
  }

  function animate () {
    requestAnimationFrame(animate)
    if (mixer) mixer.update(clock.getDelta())
    controls.update()
    render()
  }
  // Fire it up!
  function render () {
    renderer.render(scene, camera)
  }
})
