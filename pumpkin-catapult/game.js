// STUDENT TODO: Adjust these values for gameplay tuning
const CONFIG = {
    minAngle: 10,        // Minimum launch angle (degrees)
    maxAngle: 80,        // Maximum launch angle (degrees)
    minPower: 5,         // Minimum launch power
    maxPower: 25,        // Maximum launch power
    gravity: 0.3,        // Gravity strength
    targetDistance: 400, // Distance to target
    // Turkey hopping parameters
    turkeyHopStrengthMin: -6,    // Minimum upward velocity
    turkeyHopStrengthMax: -8,    // Maximum upward velocity
    turkeyHopDistanceMin: 1,     // Minimum horizontal velocity
    turkeyHopDistanceMax: 2.5,   // Maximum horizontal velocity
    turkeyGroundTimeMin: 30,     // Min frames between hops
    turkeyGroundTimeMax: 90,     // Max frames between hops
    turkeyMinX: 250,             // Left boundary
    turkeyMaxX: 650              // Right boundary
};

let angle = 45;
let power = 15;
let projectile = null;
let targets = [];
let score = 0;
let launches = 0;
let gameState = 'aiming'; // 'aiming' or 'flying'

// Projectile and target images (students will replace these)
let pumpkinImg;
let targetImgs = {};

function preload() {
    // Try to load images, fall back to shapes if not found
    try {
        pumpkinImg = loadImage('assets/pumpkin.png', 
            () => console.log('Pumpkin loaded'),
            () => { console.log('Pumpkin image not found, using circle'); pumpkinImg = null; }
        );
        
        targetImgs.turkey = loadImage('assets/turkey.png',
            () => console.log('Turkey loaded'),
            () => { console.log('Turkey image not found, using shape'); targetImgs.turkey = null; }
        );
        
        targetImgs.barn = loadImage('assets/barn.png',
            () => console.log('Barn loaded'),
            () => { console.log('Barn image not found, using shape'); targetImgs.barn = null; }
        );
    } catch (e) {
        console.log('Error loading images:', e);
    }
}

function setup() {
    createCanvas(800, 600);

    // Create targets at different distances
    targets = [
        {
            x: 400,
            y: height - 100,
            w: 60,
            h: 80,
            type: 'turkey',
            hit: false,
            // Hopping properties
            groundY: height - 100,              // Original ground position
            hopState: 'grounded',               // Current state: 'grounded' or 'hopping'
            groundTimer: random(30, 90),        // Frames until next hop
            vx: 0,                              // Horizontal velocity
            vy: 0,                              // Vertical velocity
            direction: random() < 0.5 ? -1 : 1  // Hop direction (left or right)
        },
        { x: 550, y: height - 120, w: 100, h: 100, type: 'barn', hit: false }
    ];
}

function draw() {
    // Sky and ground
    background(135, 206, 235);
    
    // Ground
    fill(101, 67, 33);
    rect(0, height - 80, width, 80);
    fill(34, 139, 34);
    rect(0, height - 90, width, 10);
    
    // Draw catapult base
    drawCatapult();

    // Update target positions (turkey hopping)
    updateTargets();

    // Draw targets
    drawTargets();
    
    // Update and draw projectile
    if (gameState === 'flying' && projectile) {
        updateProjectile();
        drawProjectile();
    }
    
    // Draw UI
    drawUI();
    
    // Instructions
    if (gameState === 'aiming') {
        fill(255);
        stroke(0);
        strokeWeight(3);
        textAlign(CENTER);
        textSize(18);
        text('SPACE to launch | UP/DOWN for angle | LEFT/RIGHT for power', width/2, 40);
    }
}

function drawCatapult() {
    push();
    translate(100, height - 90);
    
    // Base
    fill(101, 67, 33);
    rect(-30, 0, 60, 40);
    
    // Arm
    push();
    rotate(-radians(angle));
    stroke(101, 67, 33);
    strokeWeight(8);
    line(0, 0, 0, -80);
    
    // Bucket
    fill(139, 69, 19);
    ellipse(0, -80, 20, 20);
    pop();
    
    pop();
}

function drawTargets() {
    for (let target of targets) {
        if (target.hit) {
            continue; // Don't draw hit targets
        }
        
        push();
        
        const img = targetImgs[target.type];
        
        if (img && img.width > 0) {
            // Draw image if loaded
            imageMode(CENTER);
            image(img, target.x, target.y, target.w, target.h);
        } else {
            // Fallback shapes
            if (target.type === 'turkey') {
                // Simple turkey shape
                fill(139, 69, 19);
                ellipse(target.x, target.y, target.w * 0.8, target.h * 0.8);
                fill(165, 42, 42);
                triangle(target.x - 20, target.y - 20, 
                        target.x - 30, target.y - 30, 
                        target.x - 15, target.y - 30);
                fill(255, 200, 0);
                triangle(target.x - 10, target.y, target.x, target.y + 10, target.x - 5, target.y);
            } else if (target.type === 'barn') {
                // Simple barn shape
                fill(165, 42, 42);
                rectMode(CENTER);
                rect(target.x, target.y, target.w, target.h);
                fill(139, 69, 19);
                triangle(target.x - target.w/2, target.y - target.h/2,
                        target.x + target.w/2, target.y - target.h/2,
                        target.x, target.y - target.h/2 - 30);
            }
        }
        
        pop();
    }
}

function drawProjectile() {
    if (!projectile) return;
    
    push();
    
    if (pumpkinImg && pumpkinImg.width > 0) {
        imageMode(CENTER);
        image(pumpkinImg, projectile.x, projectile.y, 40, 40);
    } else {
        // Fallback: orange circle
        fill(255, 140, 0);
        stroke(255, 100, 0);
        strokeWeight(2);
        ellipse(projectile.x, projectile.y, 30, 30);
    }
    
    pop();
}

function updateProjectile() {
    if (!projectile) return;
    
    // Apply gravity
    projectile.vy += CONFIG.gravity;
    
    // Update position
    projectile.x += projectile.vx;
    projectile.y += projectile.vy;
    
    // Check collision with targets
    for (let target of targets) {
        if (target.hit) continue;
        
        if (abs(projectile.x - target.x) < target.w/2 + 15 &&
            abs(projectile.y - target.y) < target.h/2 + 15) {
            target.hit = true;
            score += 100;
            console.log('Hit!');
        }
    }
    
    // Check if projectile is off screen or hit ground
    if (projectile.y > height - 90 || projectile.x > width || projectile.x < 0) {
        gameState = 'aiming';
        projectile = null;
        launches++;
    }
}

function updateTargets() {
    for (let target of targets) {
        // Skip non-turkeys and hit targets
        if (target.type !== 'turkey' || target.hit) continue;

        // State machine for hopping behavior
        if (target.hopState === 'grounded') {
            // COUNTDOWN TO NEXT HOP
            target.groundTimer--;

            if (target.groundTimer <= 0) {
                // Initialize new hop
                target.vy = random(CONFIG.turkeyHopStrengthMin, CONFIG.turkeyHopStrengthMax);
                target.vx = target.direction * random(CONFIG.turkeyHopDistanceMin, CONFIG.turkeyHopDistanceMax);
                target.hopState = 'hopping';
            }

        } else if (target.hopState === 'hopping') {
            // PHYSICS SIMULATION
            // Apply gravity
            target.vy += CONFIG.gravity;

            // Update position
            target.x += target.vx;
            target.y += target.vy;

            // Check ground collision
            if (target.y >= target.groundY) {
                // Landed
                target.y = target.groundY;
                target.vx = 0;
                target.vy = 0;
                target.hopState = 'grounded';
                target.groundTimer = random(CONFIG.turkeyGroundTimeMin, CONFIG.turkeyGroundTimeMax);

                // Randomly change direction (30% chance)
                if (random() < 0.3) {
                    target.direction *= -1;
                }
            }

            // Enforce boundaries
            if (target.x < CONFIG.turkeyMinX) {
                target.x = CONFIG.turkeyMinX;
                target.direction = 1;  // Force rightward hops
            } else if (target.x > CONFIG.turkeyMaxX) {
                target.x = CONFIG.turkeyMaxX;
                target.direction = -1;  // Force leftward hops
            }
        }
    }
}

function drawUI() {
    // Score and stats
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    textSize(20);
    text(`Score: ${score}`, 20, 30);
    text(`Launches: ${launches}`, 20, 60);
    
    if (gameState === 'aiming') {
        text(`Angle: ${angle}°`, 20, 90);
        text(`Power: ${power}`, 20, 120);
    }
    
    // Check if all targets hit
    if (targets.every(t => t.hit)) {
        fill(255, 215, 0);
        stroke(0);
        strokeWeight(5);
        textAlign(CENTER);
        textSize(48);
        text('🎉 ALL TARGETS HIT! 🎉', width/2, height/2);
        textSize(24);
        text(`Score: ${score} | Launches: ${launches}`, width/2, height/2 + 50);
        text('Refresh to play again!', width/2, height/2 + 90);
    }
}

function launchProjectile() {
    const launchAngle = radians(angle);
    
    projectile = {
        x: 100,
        y: height - 90,
        vx: cos(-launchAngle) * power,
        vy: sin(-launchAngle) * power
    };
    
    gameState = 'flying';
}

function keyPressed() {
    if (gameState === 'aiming') {
        // Adjust angle
        if (keyCode === UP_ARROW) {
            angle = constrain(angle + 2, CONFIG.minAngle, CONFIG.maxAngle);
        } else if (keyCode === DOWN_ARROW) {
            angle = constrain(angle - 2, CONFIG.minAngle, CONFIG.maxAngle);
        }
        
        // Adjust power
        if (keyCode === RIGHT_ARROW) {
            power = constrain(power + 0.5, CONFIG.minPower, CONFIG.maxPower);
        } else if (keyCode === LEFT_ARROW) {
            power = constrain(power - 0.5, CONFIG.minPower, CONFIG.maxPower);
        }
        
        // Launch
        if (key === ' ') {
            launchProjectile();
        }
    }
}
