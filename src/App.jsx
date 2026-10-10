import React, { useEffect, useRef, useState } from 'react'

const COLLAGE_IMAGES = [
  { src: '/assets/child-at-play-sign.png', alt: 'Slow sign', className: 'sign' },
  { src: '/assets/activity-cube-cutout.png', alt: 'Activity cube', className: 'activity', cutout: true, aggressiveCutout: true },
  { src: '/assets/sea-stax-box.png', alt: 'Sea Stax puzzle box', className: 'sea', cutout: true },
  { src: '/assets/sea-stax-pieces.png', alt: 'Sea Stax animal pieces', className: 'sea-pieces', cutout: true, aggressiveCutout: true },
  { src: '/assets/joker-blue.png', alt: 'Blue joker card', className: 'joker-blue' },
  { src: '/assets/joker-sketch.png', alt: 'Joker sketch', className: 'joker-sketch' },
  { src: '/assets/patriarchy-advisory.png', alt: 'Patriarchy advisory', className: 'advisory', still: true },
  { src: '/assets/clippy.png', alt: 'Clippy', className: 'clippy' },
  { src: '/assets/tamagotchi-pink.png', alt: 'Pink virtual pet', className: 'tamagotchi' },
  { src: '/assets/thisway-doll.png', alt: 'Thisway doll', className: 'thisway-doll' },
  { src: '/assets/retro-paint.png', alt: 'Retro Paint window', className: 'retro-paint', cutout: true },
  { src: '/assets/candle-creature.png', alt: 'Candle creature', className: 'candle-creature' },
  { src: '/assets/pepper-oil.png', alt: 'Pepper oil bottle', className: 'pepper-oil' },
  { src: '/assets/neon-pet.png', alt: 'Neon virtual pet', className: 'neon-pet' },
  { src: '/assets/pixel-face.png', alt: 'Pixel-art face', className: 'pixel-face' },
  { src: '/assets/stars.gif', alt: 'Animated green star', className: 'stars-gif' },
  { src: '/assets/Gothorita.webp', alt: 'Gothorita', className: 'gothorita' },
  { src: '/assets/greyfaerie.gif', alt: 'Animated grey faerie', className: 'grey-faerie', animatedCutout: true },
  { src: '/assets/faeriegreen.gif', alt: 'Animated green faerie', className: 'green-faerie' },
  { src: '/assets/heart.gif', alt: 'Animated winged heart', className: 'winged-heart' },
  { src: '/assets/ralts2.gif', alt: 'Animated tiny Ralts', className: 'ralts-tiny' },
  { src: '/assets/raltss.png', alt: 'Ralts', className: 'ralts-large', cutout: true },
  { src: '/assets/sprout2.gif', alt: 'Animated sprout', className: 'sprout2-gif', animatedCutout: true },
]

const CATEGORIES = [
  { name: 'playlists', icon: '/assets/icon-playlists.png' },
  { name: 'pets', icon: '/assets/icon-pets.png' },
  { name: 'books', icon: '/assets/icon-books.png' },
  { name: 'pics', icon: '/assets/icon-pics.png' },
  { name: 'fun facts', icon: '/assets/icon-fun-facts.png' },
]

const PIC_ICONS = [
  { src: '/assets/pic-icon-01.png', name: 'charli.png' },
  { src: '/assets/pic-icon-02.png', name: 'thailand.png' },
  { src: '/assets/pic-icon-03.png', name: 'grocery.png' },
  { src: '/assets/pic-icon-04.png', name: 'photoshoot.png' },
]

const PET_ICONS = [
  { src: '/assets/spider-pet.png', name: 'hypatia.png' },
  { src: '/assets/busy-town-spider.png', name: 'aspasia.png' },
  { src: '/assets/coding-chameleon.png', name: 'coding-chameleon.png' },
]

const BACKGROUND_DOODLES = [
  { src: '/assets/doodle-bunnies.png', alt: 'Bunny doodles', className: 'doodle-bunnies' },
  { src: '/assets/doodle-cats.png', alt: 'Cat doodles', className: 'doodle-cats' },
  { src: '/assets/doodle-tree.png', alt: 'Bow and flower doodles', className: 'doodle-tree' },
  { src: '/assets/doodle-bow.png', alt: 'Bow doodle', className: 'doodle-bow' },
]

let nextCollageZIndex = 100

function findVisibleBounds(data, width, height) {
  let left = width
  let top = height
  let right = -1
  let bottom = -1

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] <= 8) continue
      left = Math.min(left, x)
      top = Math.min(top, y)
      right = Math.max(right, x)
      bottom = Math.max(bottom, y)
    }
  }

  return right < left
    ? { x: 0, y: 0, width, height, sourceWidth: width, sourceHeight: height }
    : {
        x: left,
        y: top,
        width: right - left + 1,
        height: bottom - top + 1,
        sourceWidth: width,
        sourceHeight: height,
      }
}

function AutoCroppedImage({ src, alt }) {
  const [bounds, setBounds] = useState(null)

  const inspectImage = (event) => {
    const image = event.currentTarget
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d', { willReadFrequently: true })
    context.drawImage(image, 0, 0)
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
    setBounds(findVisibleBounds(pixels.data, canvas.width, canvas.height))
  }

  if (!bounds) {
    return <img src={src} alt={alt} draggable="false" onLoad={inspectImage} />
  }

  return (
    <span
      className="auto-crop"
      style={{
        aspectRatio: `${bounds.width} / ${bounds.height}`,
        width: `${bounds.width / bounds.sourceWidth * 100}%`,
        marginLeft: `${bounds.x / bounds.sourceWidth * 100}%`,
        marginTop: `${bounds.y / bounds.sourceWidth * 100}%`,
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable="false"
        style={{
          width: `${bounds.sourceWidth / bounds.width * 100}%`,
          maxWidth: 'none',
          left: `${-bounds.x / bounds.width * 100}%`,
          top: `${-bounds.y / bounds.height * 100}%`,
        }}
      />
    </span>
  )
}

function BackgroundRemovedImage({ src, alt, aggressive = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const image = new Image()
    image.decoding = 'async'

    image.onload = () => {
      if (cancelled || !canvasRef.current) return
      const canvas = canvasRef.current
      const context = canvas.getContext('2d', { willReadFrequently: true })
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      context.drawImage(image, 0, 0)

      const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
      const { data } = pixels
      const width = canvas.width
      const height = canvas.height
      const count = width * height
      const visited = new Uint8Array(count)
      const queue = new Int32Array(count)
      let head = 0
      let tail = 0

      const isBackgroundPixel = (position) => {
        const offset = position * 4
        const red = data[offset]
        const green = data[offset + 1]
        const blue = data[offset + 2]
        const minimum = Math.min(red, green, blue)
        const colorRange = Math.max(red, green, blue) - minimum
        return aggressive
          ? minimum > 165 && colorRange < 72
          : minimum > 190 && colorRange < 32
      }

      const add = (position) => {
        if (visited[position]) return
        if (isBackgroundPixel(position)) {
          visited[position] = 1
          queue[tail] = position
          tail += 1
        }
      }

      for (let x = 0; x < width; x += 1) {
        add(x)
        add((height - 1) * width + x)
      }
      for (let y = 0; y < height; y += 1) {
        add(y * width)
        add(y * width + width - 1)
      }

      while (head < tail) {
        const position = queue[head]
        head += 1
        const x = position % width
        if (x > 0) add(position - 1)
        if (x < width - 1) add(position + 1)
        if (position >= width) add(position - width)
        if (position < count - width) add(position + width)
      }

      if (aggressive) {
        const minimumPatchSize = Math.max(900, Math.floor(count * 0.002))
        for (let start = 0; start < count; start += 1) {
          if (visited[start] || !isBackgroundPixel(start)) continue
          head = 0
          tail = 1
          queue[0] = start
          visited[start] = 2

          while (head < tail) {
            const position = queue[head]
            head += 1
            const x = position % width
            const addToPatch = (next) => {
              if (visited[next] || !isBackgroundPixel(next)) return
              visited[next] = 2
              queue[tail] = next
              tail += 1
            }
            if (x > 0) addToPatch(position - 1)
            if (x < width - 1) addToPatch(position + 1)
            if (position >= width) addToPatch(position - width)
            if (position < count - width) addToPatch(position + width)
          }

          const patchState = tail >= minimumPatchSize ? 1 : 3
          for (let index = 0; index < tail; index += 1) {
            visited[queue[index]] = patchState
          }
        }
      }

      for (let position = 0; position < count; position += 1) {
        if (visited[position] !== 1) continue
        const offset = position * 4
        const average = (data[offset] + data[offset + 1] + data[offset + 2]) / 3
        const cutoff = aggressive ? 228 : 245
        const feather = aggressive ? 11 : 6
        data[offset + 3] = Math.max(0, Math.min(255, (cutoff - average) * feather))
      }

      context.putImageData(pixels, 0, 0)
      const bounds = findVisibleBounds(data, width, height)
      if (bounds.width !== width || bounds.height !== height || bounds.x || bounds.y) {
        canvas.style.width = `${bounds.width / width * 100}%`
        canvas.style.marginLeft = `${bounds.x / width * 100}%`
        canvas.style.marginTop = `${bounds.y / width * 100}%`
        const cropped = document.createElement('canvas')
        cropped.width = bounds.width
        cropped.height = bounds.height
        cropped.getContext('2d').drawImage(
          canvas,
          bounds.x,
          bounds.y,
          bounds.width,
          bounds.height,
          0,
          0,
          bounds.width,
          bounds.height,
        )
        canvas.width = bounds.width
        canvas.height = bounds.height
        canvas.getContext('2d').drawImage(cropped, 0, 0)
      }
    }

    image.src = src
    return () => { cancelled = true }
  }, [src])

  return <canvas ref={canvasRef} role="img" aria-label={alt} />
}

function AnimatedBackgroundRemovedImage({ src, alt }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let animationFrame
    let stopped = false
    let cropBounds = null
    const image = new Image()
    const workCanvas = document.createElement('canvas')

    const renderFrame = () => {
      const canvas = canvasRef.current
      if (stopped || !canvas) return
      if (workCanvas.width !== image.naturalWidth || workCanvas.height !== image.naturalHeight) {
        workCanvas.width = image.naturalWidth
        workCanvas.height = image.naturalHeight
      }
      const context = workCanvas.getContext('2d', { willReadFrequently: true })

      context.clearRect(0, 0, workCanvas.width, workCanvas.height)
      context.drawImage(image, 0, 0)
      const pixels = context.getImageData(0, 0, workCanvas.width, workCanvas.height)
      const { data } = pixels
      const width = workCanvas.width
      const height = workCanvas.height
      const count = width * height
      const visited = new Uint8Array(count)
      const queue = new Int32Array(count)
      let head = 0
      let tail = 0

      const add = (position) => {
        if (visited[position]) return
        const offset = position * 4
        const red = data[offset]
        const green = data[offset + 1]
        const blue = data[offset + 2]
        const minimum = Math.min(red, green, blue)
        const range = Math.max(red, green, blue) - minimum
        if (minimum > 205 && range < 48) {
          visited[position] = 1
          queue[tail] = position
          tail += 1
        }
      }

      for (let x = 0; x < width; x += 1) {
        add(x)
        add((height - 1) * width + x)
      }
      for (let y = 0; y < height; y += 1) {
        add(y * width)
        add(y * width + width - 1)
      }
      while (head < tail) {
        const position = queue[head]
        head += 1
        const x = position % width
        if (x > 0) add(position - 1)
        if (x < width - 1) add(position + 1)
        if (position >= width) add(position - width)
        if (position < count - width) add(position + width)
      }
      for (let position = 0; position < count; position += 1) {
        if (!visited[position]) continue
        const offset = position * 4
        const average = (data[offset] + data[offset + 1] + data[offset + 2]) / 3
        data[offset + 3] = Math.max(0, Math.min(255, (238 - average) * 9))
      }
      context.putImageData(pixels, 0, 0)
      cropBounds ||= findVisibleBounds(data, width, height)
      if (canvas.width !== cropBounds.width || canvas.height !== cropBounds.height) {
        canvas.width = cropBounds.width
        canvas.height = cropBounds.height
        canvas.style.width = `${cropBounds.width / width * 100}%`
        canvas.style.marginLeft = `${cropBounds.x / width * 100}%`
        canvas.style.marginTop = `${cropBounds.y / width * 100}%`
      }
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      canvas.getContext('2d').drawImage(
        workCanvas,
        cropBounds.x,
        cropBounds.y,
        cropBounds.width,
        cropBounds.height,
        0,
        0,
        cropBounds.width,
        cropBounds.height,
      )
      animationFrame = requestAnimationFrame(renderFrame)
    }

    image.onload = renderFrame
    image.src = src
    return () => {
      stopped = true
      cancelAnimationFrame(animationFrame)
    }
  }, [src])

  return <canvas ref={canvasRef} role="img" aria-label={alt} />
}

function CollagePiece({ image }) {
  const [position, setPosition] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(null)
  const dragRef = useRef(null)

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return
    const element = event.currentTarget
    element.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: element.offsetLeft,
      top: element.offsetTop,
    }
    nextCollageZIndex += 1
    setZIndex(nextCollageZIndex)
    setIsDragging(true)
    event.preventDefault()
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    setPosition({
      left: drag.left + event.clientX - drag.startX,
      top: drag.top + event.clientY - drag.startY,
    })
  }

  const finishDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const draggedStyle = {
    ...(position
      ? { left: `${position.left}px`, top: `${position.top}px`, right: 'auto', bottom: 'auto' }
      : {}),
    ...(zIndex === null ? {} : { zIndex }),
  }

  return (
    <div
      className={`collage-piece ${image.className} ${image.still ? 'is-still' : ''} ${isDragging ? 'is-dragging' : ''}`}
      style={draggedStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      {image.animatedCutout ? (
        <AutoCroppedImage src={image.src} alt={image.alt} />
      ) : image.cutout ? (
        <BackgroundRemovedImage src={image.src} alt={image.alt} aggressive={image.aggressiveCutout} />
      ) : (
        <AutoCroppedImage src={image.src} alt={image.alt} />
      )}
    </div>
  )
}

function CrayonAvatar({ className, color, variant }) {
  const filterId = `avatar-${variant}`
  return (
    <svg className={`avatar-doodle ${className}`} viewBox="0 0 160 150" aria-hidden="true">
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.12" numOctaves="2" seed={variant === 'winged' ? 3 : 11} />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
      </defs>
      <g stroke={color} filter={`url(#${filterId})`}>
        <path d="M48 77 C48 47 66 29 88 31 C111 33 125 51 121 78 C118 102 103 114 84 113 C64 112 48 99 48 77 Z" />
        <path d={variant === 'winged'
          ? 'M47 66 C31 52 16 56 12 69 C8 83 22 94 38 87 M122 66 C137 51 151 56 155 69 C159 82 145 94 130 87'
          : 'M49 59 C59 37 78 29 98 35 C111 39 119 47 123 60 M47 61 C32 50 21 57 21 69 C22 80 34 85 46 79 M123 61 C138 49 150 56 150 69 C149 81 137 85 125 79'} />
        <path d="M63 77 C67 81 71 81 75 77 M94 77 C98 81 102 81 106 77 M80 91 C84 95 89 95 93 91" />
        <path d="M58 117 C71 128 100 129 113 116" />
        <path d="M27 30 L31 20 L35 30 L45 34 L35 38 L31 48 L27 38 L17 34 Z" />
      </g>
    </svg>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('pics')
  const [selectedItem, setSelectedItem] = useState(null)
  const activeItems = activeCategory === 'pics'
    ? PIC_ICONS
    : activeCategory === 'pets'
      ? PET_ICONS
      : []

  return (
    <main className="dream-page">
      <div
        className="top-marquee"
        role="banner"
        aria-label="The adventures of Agility Leaf, 叶敏, x Thinking Source, 思源"
      >
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span className="marquee-copy" key={index}>
              THE ADVENTURES OF{' '}
              <a className="marquee-leaf" href="https://amandayeh.com/" target="_blank" rel="noreferrer">
                AGILITY LEAF (叶敏) ↗
              </a>
              {' '}X{' '}
              <a className="marquee-source" href="https://mellyeliu.online/" target="_blank" rel="noreferrer">
                THINKING SOURCE (思源) ↗
              </a>
            </span>
          ))}
        </div>
      </div>
      <div className="sparkle-field" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <i key={index}>✦</i>)}
      </div>
      <div className="collage" aria-label="Thinking Leaf image collage">
        {COLLAGE_IMAGES.map((image) => <CollagePiece image={image} key={image.className} />)}
        <CrayonAvatar className="avatar-green" color="#16896b" variant="winged" />
        <CrayonAvatar className="avatar-purple" color="#6943a5" variant="round" />
      </div>

      <div className="center-stack">
        <section className="index-panel">
          <nav className="category-row" aria-label="Categories">
            {CATEGORIES.map((category) => (
              <button
                className={activeCategory === category.name ? 'is-active' : ''}
                type="button"
                onClick={() => {
                  setActiveCategory(category.name)
                  setSelectedItem(null)
                }}
                key={category.name}
              >
                <span className={`category-icon-slot ${category.icon ? '' : 'is-empty'}`}>
                  {category.icon && (
                    <BackgroundRemovedImage src={category.icon} alt={`${category.name} icon`} />
                  )}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </section>
        <section className="upper-panel" aria-label={`${activeCategory} content panel`}>
          <div className="panel-content">
            {selectedItem ? (
              <div className="file-preview">
                <div className="preview-image-wrap">
                  <img src={selectedItem.src} alt={selectedItem.name} draggable="false" />
                </div>
                <div className="preview-copy">
                  <h2>{selectedItem.name}</h2>
                </div>
              </div>
            ) : (
              <div className="pics-grid">
                {activeItems.map((item) => (
                  <button
                    className="pic-file file-button"
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    key={item.src}
                  >
                    <img src={item.src} alt="" draggable="false" />
                    <span className="pic-file-name">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="finder-path" aria-label="Current Finder path">
            <button className="path-tier" type="button" onClick={() => setSelectedItem(null)}>
              <span className="finder-folder" aria-hidden="true">💻</span>This PC
            </button>
            <span className="path-divider" aria-hidden="true">&gt;</span>
            <button className="path-tier" type="button" onClick={() => setSelectedItem(null)}>
              <span className="finder-folder" aria-hidden="true">💾</span>Local Disk (C:)
            </button>
            <span className="path-divider" aria-hidden="true">&gt;</span>
            <button className="path-tier" type="button" onClick={() => setSelectedItem(null)}>
              <span className="finder-folder" aria-hidden="true">📁</span>thinking-leaf
            </button>
            <span className="path-divider" aria-hidden="true">&gt;</span>
            <button className="path-tier" type="button" onClick={() => setSelectedItem(null)}>
              <span className="finder-folder" aria-hidden="true">📁</span>{activeCategory}
            </button>
            {selectedItem && (
              <>
                <span className="path-divider" aria-hidden="true">&gt;</span>
                <span className="path-file">🖼️{selectedItem.name}</span>
              </>
            )}
          </div>
        </section>
      </div>

      <div
        className="bottom-marquee"
        aria-label="Thinking Leaf copyright. Listening to Birds Just Wanna Be Planes. Working on Boy Poster."
      >
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <span className="marquee-copy status-copy" key={index}>
              <span>THINKING LEAF PRODUCTIONS 💭🍃</span>
              <span>🎧 𝓛𝓘𝓢𝓣𝓔𝓝𝓘𝓝𝓖 𝓣𝓞 BIRDS JUST WANNA BE PLANES</span>
              <span>💻 𝓦𝓞𝓡𝓚𝓘𝓝𝓖 𝓞𝓝 BOY POSTER</span>
            </span>
          ))}
        </div>
      </div>

    </main>
  )
}
