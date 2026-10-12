import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const COLLAGE_IMAGES = [
  { src: '/assets/child-at-play-sign.webp', alt: 'Slow autistic child at play sign', className: 'sign', hoverText: 'thank u madeleine <3' },
  { src: '/assets/activity-cube-cutout.webp', alt: 'Activity cube', className: 'activity', cutout: true, aggressiveCutout: true, hoverText: 'roadside toddler bead maze turned spider playground\u00a0🕷️ 🛝' },
  { src: '/assets/sea-stax-box.webp', alt: 'Sea Stax puzzle box', className: 'sea', cutout: true, hoverText: 'sea stax puzzle box' },
  { src: '/assets/sea-stax-pieces.webp', alt: 'Sea Stax animal pieces', className: 'sea-pieces', cutout: true, aggressiveCutout: true, hoverText: 'sea stax creatures' },
  { src: '/assets/joker-blue.webp', alt: 'Blue joker card', className: 'joker-blue', hoverText: 'recovering balatro addicts' },
  { src: '/assets/joker-sketch.webp', alt: 'Joker sketch', className: 'joker-sketch', hoverText: 'recovering balatro addicts' },
  { src: '/assets/patriarchy-advisory.webp', alt: 'Patriarchy advisory', className: 'advisory', still: true, hoverText: 'slut <> femcel <> ace superposition' },
  { src: '/assets/clippy.webp', alt: 'Clippy', className: 'clippy', hoverText: "clippy's pliable little body\u00a0📎💘" },
  { src: '/assets/tamagotchi-pink.webp', alt: 'Pink virtual pet', className: 'tamagotchi', hoverText: 'He lives in a space egg and\nwith the right care he will\ntransform into a virtual BOY.' },
  { src: '/assets/thisway-doll.webp', alt: 'Clown Skullpanda doll', className: 'thisway-doll', hoverText: 'unwanted clown skullpanda' },
  { src: '/assets/retro-paint.webp', alt: 'Retro Paint window', className: 'retro-paint', trimTransparentBox: true, hoverText: 'ms paint mirror!' },
  { src: '/assets/candle-creature.webp', alt: 'Candle Skullpanda', className: 'candle-creature', hoverText: 'went to pmall over thanksgiving\nand came back with $200 worth\nof blind boxes' },
  { src: '/assets/pepper-oil.webp', alt: 'Pepper oil bottle', className: 'pepper-oil', hoverText: 'Who Will Sponsor Our 花椒油 Keychain Merch Idea?' },
  { src: '/assets/pixel-face.webp', alt: 'Pixel-art face', className: 'pixel-face' },
  { src: '/assets/stars.gif', alt: 'Animated green star', className: 'stars-gif' },
  { src: '/assets/Gothorita.webp', alt: 'Gothorita', className: 'gothorita', hoverText: 'gothorita\u00a0🖤🔮' },
  { src: '/assets/greyfaerie.gif', alt: 'Animated grey faerie', className: 'grey-faerie', animatedCutout: true, hoverText: 'grey faerie' },
  { src: '/assets/faeriegreen.gif', alt: 'Animated Negg Faerie', className: 'green-faerie', hoverText: 'negg faerie' },
  { src: '/assets/heart.gif', alt: 'Animated winged heart', className: 'winged-heart' },
  { src: '/assets/ralts2.gif', alt: 'Animated tiny Ralts', className: 'ralts-tiny', hoverText: 'tiny ralts\u00a0💚✨' },
  { src: '/assets/raltss.webp', alt: 'Ralts', className: 'ralts-large', cutout: true, hoverText: 'ralts\u00a0💚🌸' },
  { src: '/assets/sprout2.gif', alt: 'Animated sprout', className: 'sprout2-gif', animatedCutout: true, hoverText: 'no cilantro please!' },
  { src: '/assets/lego-friends.png', alt: 'Lego flower friends', className: 'lego-friends', hoverText: 'lego gothorita and ralts <3' },
  { src: '/assets/gameboy-color.png', alt: 'Pink Game Boy Color', className: 'gameboy-color', trimTransparentBox: true, hoverText: 'why play gameboy when you can play boy♡game?' },
]

const CATEGORIES = [
  { name: 'music', label: '𝓶𝓾𝓼𝓲𝓬', emoji: '💿' },
  { name: 'pets', label: '𝓹𝓮𝓽𝓼', icon: '/assets/icon-pets.webp' },
  { name: 'media', label: '𝓶𝓮𝓭𝓲𝓪', icon: '/assets/comp.webp' },
  { name: 'pics', label: '𝓹𝓲𝓬𝓼', icon: '/assets/icon-pics.webp' },
  { name: 'games', label: '𝓰𝓪𝓶𝓮𝓼', icon: '/assets/icon-fun-facts.webp' },
]

const MOBILE_COLLAGE_POSITIONS = [
  [8, 4], [43, 6], [78, 2], [23, 19], [64, 17], [91, 27],
  [7, 32], [42, 29], [75, 40], [23, 44], [52, 49], [90, 54],
  [8, 57], [35, 62], [70, 63], [17, 73], [48, 76], [90, 74],
  [7, 87], [30, 94], [65, 85], [90, 96], [49, 98], [61, 32],
]

const PIC_ICONS = [
  { src: '/assets/pic-icon-01.webp', name: 'charli.png' },
  { src: '/assets/pic-icon-02.webp', name: 'thailand.png' },
  { src: '/assets/pic-icon-03.webp', name: 'grocery.png' },
  { src: '/assets/pic-icon-04.webp', name: 'photoshoot.png' },
]

const PET_ICONS = [
  { src: '/assets/spider-pet.webp', name: 'hypatia.png' },
  { src: '/assets/busy-town-spider.webp', name: 'aspasia.png' },
  { src: '/assets/coding-chameleon.webp', name: 'coding-chameleon.png', unavailable: true, hoverText: 'coming soon! (unassembled)' },
]

const MEDIA_ICONS = [
  { src: '/assets/boyzine.webp', name: 'boyzine.png' },
  { src: '/assets/boyposter-wip.webp', name: 'boyposter (wip).png' },
  { src: '/assets/thinking-leaf-poster.webp', name: '💭🍃 (wip).png' },
  { src: '/assets/boygame.webp', name: 'game (dnf)', href: 'https://www.instagram.com/b0ygame' },
  { src: '/assets/ao3-fanfic-v2.png', name: 'clippy.txt', href: 'https://archiveofourown.org/works/51323875' },
  { src: '/assets/ao3-fanfic-v2.png', name: 'notes.txt', href: 'https://archiveofourown.org/works/53351767' },
]

function toFancyGlyphs(value) {
  return Array.from(value, (character) => {
    const codePoint = character.codePointAt(0)
    if (codePoint >= 65 && codePoint <= 90) {
      return String.fromCodePoint(0x1d4d0 + codePoint - 65)
    }
    if (codePoint >= 97 && codePoint <= 122) {
      return String.fromCodePoint(0x1d4ea + codePoint - 97)
    }
    return character
  }).join('')
}

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

function AutoCroppedImage({ src, alt, fillCrop = false }) {
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
    return <img src={src} alt={alt} draggable="false" decoding="async" onLoad={inspectImage} />
  }

  return (
    <span
      className="auto-crop"
      style={{
        aspectRatio: `${bounds.width} / ${bounds.height}`,
        width: fillCrop ? '100%' : `${bounds.width / bounds.sourceWidth * 100}%`,
        marginLeft: fillCrop ? '0' : `${bounds.x / bounds.sourceWidth * 100}%`,
        marginTop: fillCrop ? '0' : `${bounds.y / bounds.sourceWidth * 100}%`,
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable="false"
        decoding="async"
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

function CollagePiece({ image, index, onHoverContext, isContextActive }) {
  const [position, setPosition] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(null)
  const dragRef = useRef(null)
  const rotationRef = useRef(null)

  const updateHoverContext = (event) => {
    if (!image.hoverText) return
    onHoverContext({ text: image.hoverText, x: event.clientX, y: event.clientY, source: image.className })
  }

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'touch') return
    updateHoverContext(event)
    if (image.still || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const element = event.currentTarget
    const currentRotation = getComputedStyle(element).rotate
    const direction = image.className.length % 2 === 0 ? 1 : -1
    rotationRef.current?.cancel()
    rotationRef.current = element.animate([
      { rotate: currentRotation === 'none' ? '0deg' : currentRotation, offset: 0 },
      { rotate: `${direction * -2}deg`, offset: 0.3 },
      { rotate: `${direction * 5}deg`, offset: 0.7 },
      { rotate: `${direction * 3}deg`, offset: 1 },
    ], {
      duration: 760,
      easing: 'cubic-bezier(.37, 0, .2, 1)',
      fill: 'forwards',
    })
  }

  const handlePointerLeave = (event) => {
    if (event.pointerType === 'touch') return
    if (image.hoverText) onHoverContext(null)
    if (image.still || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const element = event.currentTarget
    const currentRotation = getComputedStyle(element).rotate
    rotationRef.current?.cancel()
    rotationRef.current = element.animate([
      { rotate: currentRotation === 'none' ? '0deg' : currentRotation },
      { rotate: '0deg' },
    ], {
      duration: 420,
      easing: 'cubic-bezier(.22, .61, .36, 1)',
      fill: 'forwards',
    })
  }

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return
    updateHoverContext(event)
    const element = event.currentTarget
    element.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: element.offsetLeft,
      top: element.offsetTop,
      moved: false,
    }
    nextCollageZIndex += 1
    setZIndex(nextCollageZIndex)
    setIsDragging(true)
    event.preventDefault()
  }

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'touch' || dragRef.current) updateHoverContext(event)
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (Math.hypot(deltaX, deltaY) > 6) drag.moved = true

    setPosition({
      left: drag.left + deltaX,
      top: drag.top + deltaY,
    })
  }

  const finishDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsDragging(false)

    if (event.pointerType === 'touch' && image.hoverText) {
      updateHoverContext(event)
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const draggedStyle = {
    '--mobile-x': `${MOBILE_COLLAGE_POSITIONS[index][0]}%`,
    '--mobile-y': `calc(${MOBILE_COLLAGE_POSITIONS[index][1]}% + ${82 - MOBILE_COLLAGE_POSITIONS[index][1] * 1.4}px)`,
    ...(position
      ? { left: `${position.left}px`, top: `${position.top}px`, right: 'auto', bottom: 'auto' }
      : {}),
    ...(zIndex === null ? {} : { zIndex }),
  }

  return (
    <div
      className={`collage-piece ${image.className} ${image.still ? 'is-still' : ''} ${isDragging ? 'is-dragging' : ''} ${isContextActive ? 'is-context-active' : ''}`}
      data-item-tooltip={image.hoverText || undefined}
      data-tooltip-lines={['tamagotchi', 'candle-creature'].includes(image.className) ? '3' : undefined}
      style={draggedStyle}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      {image.trimTransparentBox ? (
        <AutoCroppedImage src={image.src} alt={image.alt} fillCrop />
      ) : image.animatedCutout ? (
        <AutoCroppedImage src={image.src} alt={image.alt} />
      ) : (
        <img src={image.src} alt={image.alt} draggable="false" decoding="async" />
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

function FinderFile({ item, onSelect, onHoverContext, grain = false, focused = false }) {
  const showContext = (event) => {
    if (!item.hoverText) return
    const bounds = event.currentTarget.getBoundingClientRect()
    onHoverContext({
      text: item.hoverText,
      x: event.clientX ?? bounds.left,
      y: event.clientY ?? bounds.bottom,
      source: item.name,
    })
  }
  const pngMatch = item.name.match(/^(.*)(\.png)$/i)
  const contents = (
    <>
      <img className={grain ? 'media-grain' : ''} src={item.src} alt="" draggable="false" loading="lazy" decoding="async" />
      <span className="pic-file-name" aria-hidden="true">
        {pngMatch ? (
          <>{toFancyGlyphs(pngMatch[1])}<wbr /><span className="file-extension">{toFancyGlyphs(pngMatch[2])}</span></>
        ) : toFancyGlyphs(item.name)}
      </span>
    </>
  )

  return item.href ? (
    <a className={`pic-file file-button${focused ? ' is-control-focused' : ''}`} href={item.href} target="_blank" rel="noreferrer" aria-label={item.name}>
      {contents}
    </a>
  ) : (
    <button
      className={`pic-file file-button${item.unavailable ? ' is-unavailable' : ''}${focused ? ' is-control-focused' : ''}`}
      type="button"
      onClick={(event) => item.unavailable ? showContext(event) : onSelect(item)}
      onPointerEnter={showContext}
      onPointerMove={showContext}
      onPointerLeave={() => { if (item.hoverText) onHoverContext(null) }}
      onFocus={showContext}
      onBlur={() => { if (item.hoverText) onHoverContext(null) }}
      aria-label={item.hoverText ? `${item.name}: ${item.hoverText}` : item.name}
      aria-disabled={item.unavailable || undefined}
      data-item-tooltip={item.hoverText || undefined}
      data-tooltip-allow-panel={item.hoverText ? 'true' : undefined}
    >
      {contents}
    </button>
  )
}

function AllItemTooltips() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    let frame
    let lastLayout = -Infinity
    const labels = new Map()
    const positionLabels = (time = 0) => {
      if (time - lastLayout < 100) {
        frame = requestAnimationFrame(positionLabels)
        return
      }
      lastLayout = time
      const anchors = new Set(document.querySelectorAll('[data-item-tooltip]'))
      const occupied = []
      for (const [anchor, label] of labels) {
        if (!anchors.has(anchor)) {
          label.remove()
          labels.delete(anchor)
        }
      }
      for (const anchor of anchors) {
        if (!anchor.getClientRects().length) {
          labels.get(anchor)?.remove()
          labels.delete(anchor)
          continue
        }
        let label = labels.get(anchor)
        if (!label) {
          label = document.createElement('span')
          label.className = 'always-tooltip'
          if (anchor.dataset.tooltipLines) label.dataset.lines = anchor.dataset.tooltipLines
          const copy = document.createElement('span')
          copy.className = 'always-tooltip-copy'
          copy.textContent = toFancyGlyphs(anchor.dataset.itemTooltip)
          label.appendChild(copy)
          label.setAttribute('aria-label', anchor.dataset.itemTooltip)
          layer.appendChild(label)
          let drag = null
          label.onpointerdown = (event) => {
            if (event.button !== 0) return
            event.preventDefault()
            label.setPointerCapture(event.pointerId)
            drag = { x: event.clientX, y: event.clientY, dx: Number(label.dataset.dx || 0), dy: Number(label.dataset.dy || 0) }
          }
          label.onpointermove = (event) => {
            if (!drag) return
            label.dataset.dx = drag.dx + event.clientX - drag.x
            label.dataset.dy = drag.dy + event.clientY - drag.y
          }
          label.onpointerup = label.onpointercancel = () => { drag = null }
          labels.set(anchor, label)
        }
        const bounds = anchor.getBoundingClientRect()
        const width = label.offsetWidth
        const height = label.offsetHeight
        const clampPosition = ([x, y]) => [
          Math.max(8, Math.min(x, window.innerWidth - width - 8)),
          Math.max(36, Math.min(y, window.innerHeight - height - 36)),
        ]
        const preferred = clampPosition([bounds.left + bounds.width * 0.55 + Number(label.dataset.dx || 0), bounds.top + bounds.height * 0.2 + Number(label.dataset.dy || 0)])
        const fits = ([x, y]) => !occupied.some((rect) =>
          x < rect.right + 12 && x + width > rect.left - 12 &&
          y < rect.bottom + 12 && y + height > rect.top - 12)
        const candidates = [preferred]
        for (const rect of occupied) {
          candidates.push(
            [rect.left, rect.top - height - 12],
            [rect.left, rect.bottom + 12],
            [rect.left - width - 12, rect.top],
            [rect.right + 12, rect.top],
          )
        }
        let available = label.dataset.dx !== undefined ? [preferred] : candidates.map(clampPosition).filter(fits)
        if (!available.length) {
          for (let y = 36; y <= window.innerHeight - height - 36; y += 16) {
            for (let x = 8; x <= window.innerWidth - width - 8; x += 16) {
              if (fits([x, y])) available.push([x, y])
            }
          }
        }
        available.sort((a, b) =>
          Math.hypot(a[0] - preferred[0], a[1] - preferred[1]) -
          Math.hypot(b[0] - preferred[0], b[1] - preferred[1]))
        const [left, top] = available[0] || preferred
        label.style.visibility = available.length ? 'visible' : 'hidden'
        if (available.length) occupied.push({ left, top, right: left + width, bottom: top + height })
        label.style.transform = `translate(${left}px, ${top}px)`
      }
      frame = requestAnimationFrame(positionLabels)
    }
    positionLabels()
    return () => {
      cancelAnimationFrame(frame)
      layer.replaceChildren()
    }
  }, [])

  return <div className="all-tooltips-layer" ref={layerRef} />
}

function CursorContext({ context }) {
  const fancyText = toFancyGlyphs(context.text)
  const characters = Array.from(fancyText)
  const [visibleCharacters, setVisibleCharacters] = useState(0)
  const [position, setPosition] = useState({ left: context.x + 14, top: context.y + 14 })
  const measureRef = useRef(null)

  useEffect(() => {
    setVisibleCharacters(0)
    const timer = window.setInterval(() => {
      setVisibleCharacters((current) => {
        if (current >= characters.length) {
          window.clearInterval(timer)
          return current
        }
        return current + 1
      })
    }, 22)

    return () => window.clearInterval(timer)
  }, [context.text])

  useLayoutEffect(() => {
    const placeTooltip = () => {
      if (!measureRef.current) return
      const bounds = measureRef.current.getBoundingClientRect()
      const gap = 14
      const viewportPadding = 8
      let left = context.x + gap
      let top = context.y + gap

      if (left + bounds.width > window.innerWidth - viewportPadding) {
        left = context.x - bounds.width + gap
      }
      if (top + bounds.height > window.innerHeight - viewportPadding) {
        top = context.y - bounds.height - gap
      }

      setPosition({
        left: Math.max(viewportPadding, Math.min(left, window.innerWidth - bounds.width - viewportPadding)),
        top: Math.max(viewportPadding, Math.min(top, window.innerHeight - bounds.height - viewportPadding)),
      })
    }

    placeTooltip()
    window.addEventListener('resize', placeTooltip)
    return () => window.removeEventListener('resize', placeTooltip)
  }, [context.text, context.x, context.y])

  return (
    <>
      <div
        className={`cursor-context${['tamagotchi', 'candle-creature'].includes(context.source) ? ' has-three-lines' : ''}`}
        role="tooltip"
        aria-label={context.text}
        style={position}
      >
        <span className="cursor-context-copy">
          {characters.slice(0, visibleCharacters).join('')}
        </span>
      </div>
      <div className={`cursor-context cursor-context-measure${['tamagotchi', 'candle-creature'].includes(context.source) ? ' has-three-lines' : ''}`} ref={measureRef} aria-hidden="true">
        <span className="cursor-context-copy">{fancyText}</span>
      </div>
    </>
  )
}

export default function App() {
  const [deviceView, setDeviceView] = useState('popup')
  const [popupOpen, setPopupOpen] = useState(true)
  const [showAllTooltips, setShowAllTooltips] = useState(false)
  const [background, setBackground] = useState('clouds')
  const backgrounds = ['clouds', 'stars']
  const nextBackground = backgrounds[(backgrounds.indexOf(background) + 1) % backgrounds.length]
  const [activeCategory, setActiveCategory] = useState('media')
  const [selectedItem, setSelectedItem] = useState(null)
  const [hoverContext, setHoverContext] = useState(null)
  const [focusedFile, setFocusedFile] = useState(null)
  const [screenOn, setScreenOn] = useState(true)
  const panelContentRef = useRef(null)
  const activeItems = activeCategory === 'pics'
    ? PIC_ICONS
    : activeCategory === 'pets'
      ? PET_ICONS
      : activeCategory === 'media'
        ? MEDIA_ICONS
        : []

  const changeCategory = (step) => {
    const current = CATEGORIES.findIndex((category) => category.name === activeCategory)
    setActiveCategory(CATEGORIES[(current + step + CATEGORIES.length) % CATEGORIES.length].name)
    setSelectedItem(null)
    setFocusedFile(null)
    setHoverContext(null)
  }
  const moveFile = (step) => {
    if (selectedItem || !activeItems.length) {
      panelContentRef.current?.scrollBy({ top: step * 70, behavior: 'smooth' })
      return
    }
    const next = focusedFile === null ? (step > 0 ? 0 : activeItems.length - 1) :
      (focusedFile + step + activeItems.length) % activeItems.length
    setFocusedFile(next)
    panelContentRef.current?.querySelectorAll('.file-button')[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }
  const openFile = () => {
    panelContentRef.current?.querySelectorAll('.file-button')[focusedFile ?? 0]?.click()
  }
  const home = () => {
    setActiveCategory('media')
    setSelectedItem(null)
    setFocusedFile(null)
    setScreenOn(true)
  }

  return (
    <main
      className={`dream-page${background === 'stars' ? '' : ` has-${background}-background`}`}
      onPointerDown={(event) => {
        if (event.pointerType === 'touch' && !event.target.closest('.collage-piece')) {
          setHoverContext(null)
        }
      }}
    >
      <div className="page-lcd-overlay" aria-hidden="true" />
      <div className="page-toggles">
      <button
        className="background-toggle"
        type="button"
        aria-label={`Background: ${background}. Switch to ${nextBackground} background`}
        onClick={() => setBackground(nextBackground)}
      >
        <span aria-hidden="true">✦ {toFancyGlyphs(background)} ↻</span>
      </button>
      <button
        className="tooltips-toggle background-toggle"
        type="button"
        aria-pressed={showAllTooltips}
        onClick={() => setShowAllTooltips((current) => !current)}
      >
        {toFancyGlyphs(showAllTooltips ? 'hide tooltips' : 'show tooltips')}
      </button>
      </div>
      <svg className="texture-filters" aria-hidden="true">
        <filter id="media-grain" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="17" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 .2 0"
            result="softNoise"
          />
          <feBlend in="SourceGraphic" in2="softNoise" mode="overlay" result="textured" />
          <feComposite in="textured" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>
      <div
        className="top-marquee"
        role="banner"
        aria-label="The adventures of Agility Leaf, 叶敏, x Thinking Source, 思源"
      >
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span className="marquee-copy" key={index}>
              𝓣𝓗𝓔 𝓐𝓓𝓥𝓔𝓝𝓣𝓤𝓡𝓔𝓢 𝓞𝓕{' '}
              <a className="marquee-leaf" href="https://amandayeh.com/" target="_blank" rel="noreferrer">
                AGILITY LEAF (叶敏) ↗
              </a>
              {' '}𝓧{' '}
              <a className="marquee-source" href="https://mellyeliu.online/" target="_blank" rel="noreferrer">
                THINKING SOURCE (思源) ↗
              </a>
            </span>
          ))}
        </div>
      </div>
      <div className="sparkle-field" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <i
            key={index}
            style={{
              animationDuration: `${2.8 + (index * 13 % 21) * 0.17}s`,
              animationDelay: `${-(index * 1.618 % 8.2)}s`,
              '--star-peak': 0.5 + (index * 7 % 9) * 0.03,
            }}
          >
            <svg viewBox="0 0 40 40" focusable="false">
              <path d="M20 0C21.3 16.8 23.2 18.7 40 20C23.2 21.3 21.3 23.2 20 40C18.7 23.2 16.8 21.3 0 20C16.8 18.7 18.7 16.8 20 0Z" />
            </svg>
          </i>
        ))}
      </div>
      <div className="collage" aria-label="Thinking Leaf image collage">
        {COLLAGE_IMAGES.map((image, index) => (
          <CollagePiece
            image={image}
            index={index}
            onHoverContext={setHoverContext}
            isContextActive={hoverContext?.source === image.className}
            key={image.className}
          />
        ))}
      </div>
      {showAllTooltips && <AllItemTooltips />}
      {!showAllTooltips && hoverContext && (
        <CursorContext context={hoverContext} />
      )}

      <div className={`center-stack${deviceView === 'popup' ? ' popup-window' : ''}${popupOpen ? '' : ' popup-closed'}${screenOn ? '' : ' ds-off'}`}>
        {deviceView === 'popup' && (
          <header className="popup-header">
            <span>{toFancyGlyphs('Thinking Leaf')} 💭🍃</span>
            <button type="button" aria-label="Close popup" title="Close popup" onClick={() => {
              setPopupOpen(false)
              setHoverContext(null)
            }}>×</button>
          </header>
        )}
        <img className="ds-shell" src="/assets/black-interactive-3ds-shell.webp" alt="" aria-hidden="true" draggable="false" />
        <div className="ds-dpad">
          <img className="dpad-rest" src="/assets/ds-button-dpad-black.webp" alt="" draggable="false" />
          <img className="dpad-hover" src="/assets/ds-button-dpad-black-hover.webp" alt="" draggable="false" />
          <img className="dpad-pressed" src="/assets/ds-button-dpad-black-pressed.webp" alt="" draggable="false" />
          <button className="dpad-up" type="button" disabled={!screenOn} aria-label="Previous file or scroll up" title="Previous file / scroll up" onClick={() => moveFile(-1)} />
          <button className="dpad-down" type="button" disabled={!screenOn} aria-label="Next file or scroll down" title="Next file / scroll down" onClick={() => moveFile(1)} />
          <button className="dpad-left" type="button" disabled={!screenOn} aria-label="Previous category" title="Previous category" onClick={() => changeCategory(-1)} />
          <button className="dpad-right" type="button" disabled={!screenOn} aria-label="Next category" title="Next category" onClick={() => changeCategory(1)} />
        </div>
        {[
          ['a', 'Open selected file', openFile],
          ['b', 'Back to files', () => setSelectedItem(null)],
          ['x', 'Switch background', () => setBackground(nextBackground)],
          ['y', 'Toggle tooltips', () => setShowAllTooltips((current) => !current)],
          ['stick', 'Next category', () => changeCategory(1)],
          ['c', 'Scroll to top', () => panelContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })],
          ['power', 'Toggle screens', () => setScreenOn((current) => !current)],
        ].map(([name, label, action]) => (
          <button className={`ds-control ds-control-${name}`} key={name} type="button" disabled={!screenOn && name !== 'power'} aria-label={label} title={label} onClick={action}>
            <img className="ds-button-rest" src={`/assets/ds-button-${name}.webp`} alt="" draggable="false" />
            <img className="ds-button-hover" src={`/assets/ds-button-${name}-hover.webp`} alt="" draggable="false" />
          </button>
        ))}
        <button className="ds-control ds-control-home" type="button" aria-label="Home" title="Home" onClick={home} />
        <section className="index-panel">
          <nav className="category-row" aria-label="Categories">
            {CATEGORIES.map((category) => (
              <button
                className={activeCategory === category.name ? 'is-active' : ''}
                type="button"
                aria-label={category.name}
                onClick={() => {
                  setPopupOpen(true)
                  setActiveCategory(category.name)
                  setSelectedItem(null)
                  setFocusedFile(null)
                  setHoverContext(null)
                }}
                key={category.name}
              >
                <span className="category-content">
                  <span className={`category-icon-slot ${category.icon || category.emoji ? '' : 'is-empty'}`}>
                    {category.emoji ? (
                      <span className="category-emoji" aria-hidden="true">{category.emoji}</span>
                    ) : category.icon && (
                      <BackgroundRemovedImage src={category.icon} alt={`${category.name} icon`} />
                    )}
                  </span>
                  <span className="category-label" aria-hidden="true">{category.label}</span>
                </span>
              </button>
            ))}
          </nav>
        </section>
        <section className="upper-panel" aria-label={`${activeCategory} content panel`}>
          <div className="panel-content" ref={panelContentRef}>
            {selectedItem ? (
              <div className={`file-preview${activeCategory === 'media' ? ' media-preview' : ''}`}>
                <div className="preview-image-wrap">
                  <img
                    className={activeCategory === 'media' ? 'media-grain' : ''}
                    src={selectedItem.src}
                    alt={selectedItem.name}
                    draggable="false"
                    decoding="async"
                  />
                </div>
                <div className="preview-copy">
                  <h2 aria-label={selectedItem.name}>{toFancyGlyphs(selectedItem.name)}</h2>
                </div>
              </div>
            ) : activeCategory === 'music' ? (
              <div className="music-content">
                <ul className="music-list">
                  <li className="playlist-entry">
                    <a
                      href="https://open.spotify.com/playlist/48SKfqPLYv9akELVQwieuM?si=cfa0290bc553463c"
                      target="_blank"
                      rel="noreferrer"
                    >
                      💿 𝓫𝓸𝔂𝓰𝓪𝓶𝓮 𝓹𝓵𝓪𝔂𝓵𝓲𝓼𝓽 ↗ 💿
                    </a>
                  </li>
                  <li className="playlist-entry">
                    <a
                      href="https://open.spotify.com/playlist/3D4pRCSuJAOvBxJjEh19ZV?si=9448a362f9bb4b4b"
                      target="_blank"
                      rel="noreferrer"
                    >
                      💿 𝓼𝓪𝓹𝓹𝓱𝓲𝓬 𝓲𝓷𝓭𝓲𝓮 𝓹𝓸𝓹 ↗ 💿
                    </a>
                  </li>
                  <li className="playlist-entry">
                    <a
                      href="https://open.spotify.com/playlist/3w89yqEp7sqJRK8EUnyDyv?si=725027d86e2240fa"
                      target="_blank"
                      rel="noreferrer"
                    >
                      💿 𝓼𝓵𝓾𝓽 &lt;&gt; 𝓯𝓮𝓶𝓬𝓮𝓵 ↗ 💿
                    </a>
                  </li>
                  <li className="track-entry">
                    <a
                      href="https://open.spotify.com/album/7EA0BJIxzjox8bBpMXSvqF?si=ab0YPvPsRzGukGg_NTPMtw"
                      target="_blank"
                      rel="noreferrer"
                    >
                      🎀 𝓽𝓱𝓮 𝓯𝓮𝓶𝓬𝓮𝓵𝓼 — i have to get hotter 🎀 ↗
                    </a>
                  </li>
                  <li className="track-entry">
                    <a
                      href="https://open.spotify.com/album/0mQPq9INcTC48siErksOrl?si=7ZOfJTqVTd21DR7BCHjbVQ"
                      target="_blank"
                      rel="noreferrer"
                    >
                      🔌 𝓾𝓷𝓭𝓮𝓻𝓼𝓬𝓸𝓻𝓮𝓼 — wallsocket 🔌 ↗
                    </a>
                  </li>
                  <li className="track-entry">
                    <a
                      href="https://open.spotify.com/album/6CS7IxjsKQAamJTVWvQWOF?si=SLu4NwjQTiGQUOXAhMsBOQ"
                      target="_blank"
                      rel="noreferrer"
                    >
                      🫂 𝓑𝓔𝓣𝓦𝓔𝓔𝓝 𝓕𝓡𝓘𝓔𝓝𝓓𝓢 — i love my girl shes my boy 🫂 ↗
                    </a>
                  </li>
                </ul>
              </div>
            ) : activeCategory === 'games' ? (
              <div className="coming-soon">coming soon...</div>
            ) : (
              <div className="pics-grid">
                {activeItems.map((item, index) => (
                  <FinderFile
                    item={item}
                    onSelect={setSelectedItem}
                    onHoverContext={setHoverContext}
                    grain={activeCategory === 'media'}
                    focused={focusedFile === index}
                    key={`${item.src}-${item.name}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="finder-path" aria-label="Current Finder path">
            <button className="path-tier" type="button" onClick={() => setSelectedItem(null)}>
              <span className="finder-folder" aria-hidden="true">💿</span>{toFancyGlyphs('Local Disk (C:)')}
            </button>
            <span className="path-divider" aria-hidden="true">&gt;</span>
            <button className="path-tier" type="button" onClick={() => setSelectedItem(null)}>
              <span className="finder-folder" aria-hidden="true">📁</span>{toFancyGlyphs(activeCategory)}
            </button>
            {selectedItem && (
              <>
                <span className="path-divider" aria-hidden="true">&gt;</span>
                <span className="path-file"><span aria-hidden="true">🖼️</span>{toFancyGlyphs(selectedItem.name)}</span>
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
