# Thanksgiving Game Development Lab

A collection of FOUR Thanksgiving-themed game projects designed for students to learn game development through hands-on configuration, customization, and light coding.

## Overview

Each project provides **complete working starter code** that students will:
- Configure and run on their local machines
- Customize with Thanksgiving-themed assets
- Modify light gameplay parameters
- Complete within **~1 hour per game**

## Projects Included

### 1. Turkey Tetris (Reskin)
**Technology:** HTML5 + Canvas + JavaScript  
**Focus:** Asset replacement, sound integration, basic event handling

Students reskin a working Tetris clone with Thanksgiving assets:
- Replace 7 block textures with themed images
- Add custom sound effects
- Implement "Gobble gobble!" sound on line clear
- Learn about sprite loading and audio playback

---

### 2. Pumpkin Catapult Physics Game
**Technology:** p5.js  
**Focus:** Physics tuning, sprite replacement, hit detection

Students configure a projectile physics game:
- Add pumpkin and target sprites
- Tune angle, power, and gravity parameters
- Verify collision detection works correctly
- Learn about projectile motion and game balance

---

### 3. Turkey Dash (Browser Runner)
**Technology:** HTML5 Canvas + JavaScript  
**Focus:** Game configuration, sprite animation, difficulty tuning

Students set up an endless runner:
- Replace runner and obstacle sprites
- Configure speed and gravity in `config.js`
- Add themed obstacles (gravy, pumpkins, pies)
- Verify scoring system functions
- Learn about game loops and collision systems

---

### 4. Escape the Stuffing (Maze Game)
**Technology:** p5.js  
**Focus:** Procedural generation, grid-based movement, timer systems

Students customize a maze escape game:
- Verify 10×10 maze generation
- Customize maze appearance (stuffing texture)
- Add turkey player sprite
- Confirm countdown timer and controls
- Learn about recursive backtracking algorithms

---

## Quick Start

### Prerequisites (All Projects)
- **Web Browser:** Chrome, Firefox, Safari, or Edge
- **Local Web Server:** Choose one:
  - Python 3: `python3 -m http.server 8000`
  - Node.js: `npx http-server -p 8000`
  - VS Code: Install "Live Server" extension

### Running a Project

1. **Navigate to project folder:**
   ```bash
   cd turkey-tetris  # or pumpkin-catapult, turkey-dash, escape-stuffing
   ```

2. **Start local server:**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

4. **Follow the README.md in each project folder!**

## Learning Objectives

By completing all four projects, students will learn:

### Core Concepts
- Setting up local web development environments
- Loading and displaying sprites/images
- Playing audio files and handling media
- Basic game loops and frame updates
- Collision detection techniques
- Physics simulation (gravity, velocity, projectile motion)
- User input handling (keyboard events)
- Game state management
- Score tracking and UI/HUD systems
- Configuration files for game tuning

### Advanced Concepts
- Procedural content generation (maze algorithm)
- Grid-based movement systems
- Timer and countdown mechanics
- Asset pipeline and resource loading
- Game feel tuning and balancing

---

## Asset Recommendations

### Where to Find Free Assets

**Images:**
- [OpenGameArt.org](https://opengameart.org/) - Free game assets
- [Kenney.nl](https://kenney.nl/assets) - Huge library of free game assets
- [Itch.io](https://itch.io/game-assets/free) - Community-created free assets

**Sounds:**
- [Freesound.org](https://freesound.org/) - Creative Commons sounds
- [Zapsplat.com](https://www.zapsplat.com/) - Free sound effects
- [Pixabay Sounds](https://pixabay.com/sound-effects/) - Royalty-free sounds

**Or create your own:**
- Use drawing tools (Paint, GIMP, Photoshop, Procreate)
- Record sounds with your phone
- Use online sprite/sound generators

**Tip:** PNG files with transparent backgrounds work best!

---

## Common Issues & Solutions

### "Images won't load"
- Check filename matches exactly (case-sensitive!)
- Verify file is in correct folder
- Use browser console (F12) to see errors
- Make sure you're using a local web server

### "No sound playing"
- Check browser console for errors
- Try `.mp3` format if `.wav` doesn't work
- Some browsers block autoplay; user interaction required
- Check file paths are correct

### "Game won't start"
- Must use local web server (not opening file directly)
- Check browser console for JavaScript errors
- Try different browser
- Clear browser cache

### "Physics feels wrong"
- Adjust parameters in config files
- Test with different values iteratively
- Read comments in code for guidance

---

## Bonus Challenges

Each project includes optional bonus challenges for advanced students:
- Adding new features
- Creating difficulty levels
- Implementing high score systems
- Adding visual effects and polish
- Creating custom algorithms

Check each project's README for specific bonus ideas!

---

## License & Usage

These projects are educational resources designed for teaching game development.

**You may:**
- Use in classroom settings
- Modify for your curriculum
- Share with students
- Build upon for learning

**Please:**
- Keep educational use free
- Credit original work when sharing
- Share improvements with community

---

## Happy Thanksgiving & Happy Coding!

Questions? Issues? Suggestions?  
Open an issue or reach out!

---

## Additional Resources

### Learn More
- [MDN Web Docs - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [p5.js Reference](https://p5js.org/reference/)
- [JavaScript Game Development](https://developer.mozilla.org/en-US/docs/Games)

### Next Steps
After completing these projects, students can:
1. Build their own game from scratch
2. Learn a game engine (Godot, Unity, Phaser)
3. Explore advanced topics (networking, AI, shaders)
4. Join game jams (Ludum Dare, Global Game Jam)

---
