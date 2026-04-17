/**
 * @typedef {{ slug: string, cardTitle: string, title: string, description: string, image: string, content: string, treatments: string[] }} Service
 */

/**
 * Files live in `public/asset/images/` and are served at `/asset/images/<filename>`.
 * @param {string} filename
 */
export function serviceImageUrl(filename) {
  return `/asset/images/${encodeURIComponent(filename)}`
}

/** @type {Service[]} */
export const services = [
  {
    slug: 'back-pain',
    cardTitle: 'Back Pain',
    title: 'Back Pain Treatment',
    description:
      'Effective physiotherapy for acute and chronic back pain—from muscle strain to disc-related issues.',
    image: serviceImageUrl('Back Pain Treatment.png'),
    content: `Back pain is one of the most common musculoskeletal problems, affecting people of all ages and lifestyles.

At Ayushman PhysioCare, we assess posture, movement patterns, and tissue loading to find the root cause—whether it is muscle strain, joint stiffness, disc irritation, or deconditioning from a sedentary routine.

Our approach combines hands-on relief with progressive exercise so you regain mobility, confidence, and long-term spine health.`,
    treatments: [
      'Manual therapy & soft-tissue techniques',
      'Postural education and ergonomic advice',
      'Stretching and progressive strengthening',
      'Core stability and motor control training',
    ],
  },
  {
    slug: 'neck-pain',
    cardTitle: 'Neck Pain',
    title: 'Neck Pain Treatment',
    description:
      'Relief from stiffness, headaches linked to posture, and neck-related nerve irritation.',
    image: serviceImageUrl('Neck Pain Treatment.png'),
    content: `Neck pain often builds gradually from desk work, phone use, poor sleep posture, or past whiplash-type injuries.

We focus on restoring comfortable range of motion, reducing muscle guarding, and retraining deep neck flexors and scapular muscles for stable, pain-free movement.

Treatment is tailored to your symptoms—whether they are local stiffness or referred discomfort into the shoulders and arms.`,
    treatments: [
      'Cervical mobility and strengthening exercises',
      'Postural retraining and workstation guidance',
      'Manual therapy for muscle and joint restriction',
      'Graded activity planning for flare-ups',
    ],
  },
  {
    slug: 'knee-pain',
    cardTitle: 'Knee Pain',
    title: 'Knee Pain Treatment',
    description:
      'Support for ligament strain, meniscus-related pain, arthritis, and post-injury knee recovery.',
    image: serviceImageUrl('Knee Pain Treatment.png'),
    content: `The knee absorbs high loads during walking, stairs, and sport. Pain may arise from overload, alignment issues, cartilage wear, or recovery after injury.

We combine strength work for the hips and thighs with balance and gait training to reduce stress on the joint and improve function in daily life.

Your plan progresses safely toward your goals—whether that is walking comfortably or returning to running.`,
    treatments: [
      'Quadriceps and hip strengthening',
      'Balance, proprioception, and gait retraining',
      'Patellar loading strategies and pain education',
      'Return-to-activity pacing',
    ],
  },
  {
    slug: 'shoulder-pain',
    cardTitle: 'Shoulder Pain',
    title: 'Shoulder Pain Treatment',
    description:
      'Care for rotator cuff issues, impingement, instability, and overuse shoulder pain.',
    image: serviceImageUrl('Shoulder Pain Treatment.png'),
    content: `Shoulder pain can limit reaching, lifting, and sleep. Common contributors include rotator cuff overload, scapular dyskinesis, and repetitive overhead activity.

We evaluate shoulder rhythm, strength, and range to build a plan that calms irritable tissues while restoring strength and control.

Sessions blend manual techniques with targeted home exercises you can sustain between visits.`,
    treatments: [
      'Rotator cuff and scapular strengthening',
      'Mobilization and graded range-of-motion work',
      'Activity modification for sport and work',
      'Progressive loading for tendon health',
    ],
  },
  {
    slug: 'sciatica',
    cardTitle: 'Sciatica',
    title: 'Sciatica Treatment',
    description:
      'Evidence-based rehab for leg pain, tingling, or numbness related to nerve sensitivity along the sciatic pathway.',
    image: serviceImageUrl('Sciatica Treatment.png'),
    content: `Sciatica-type symptoms often relate to nerve irritation from the lower back or hip region. Recovery benefits from a calm, structured approach—reducing provocative movements early while gradually rebuilding tolerance.

We explain pain mechanisms clearly and use movement, nerve gliding strategies where appropriate, and strengthening to support the spine and hips.

The aim is sustainable relief and a return to sitting, walking, and lifting with confidence.`,
    treatments: [
      'Nerve-friendly mobility and nerve gliding (when indicated)',
      'Lumbar and hip strengthening',
      'Education on positions and pacing',
      'Graded exposure to daily and work tasks',
    ],
  },
  {
    slug: 'cervical-spondylosis',
    cardTitle: 'Cervical Spondylosis',
    title: 'Cervical Spondylosis Care',
    description:
      'Management of age-related neck joint changes with focus on mobility, strength, and symptom control.',
    image: serviceImageUrl('Cervical Spondylosis Therapy.png'),
    content: `Cervical spondylosis describes wear-related changes in the neck joints and discs. Many people remain active with the right mix of mobility work, strength, and habit changes.

We help you understand flare patterns and build a routine that keeps the neck supple and supported without unnecessary fear of movement.

Treatment emphasizes graded exercise and practical strategies for desk, travel, and sleep.`,
    treatments: [
      'Controlled cervical mobility exercises',
      'Upper back and shoulder strengthening',
      'Posture and pillow guidance',
      'Pain science–informed pacing',
    ],
  },
  {
    slug: 'lumbar-spondylosis',
    cardTitle: 'Lumbar Spondylosis',
    title: 'Lumbar Spondylosis Care',
    description:
      'Support for chronic low-back stiffness and pain associated with degenerative lumbar changes.',
    image: serviceImageUrl('Lumbar Spondylosis Therapy.png'),
    content: `Lumbar spondylosis is common and often manageable with progressive strengthening, flexibility, and load management.

We focus on hip and core endurance, safe bending and lifting mechanics, and building tolerance for the activities that matter to you.

Our goal is fewer painful episodes and greater trust in your back during work and leisure.`,
    treatments: [
      'Lumbar stabilization and hip strengthening',
      'Flexibility work for hips and thoracic spine',
      'Education on lifting and sitting strategies',
      'Walking and endurance progression',
    ],
  },
  {
    slug: 'slip-disc',
    cardTitle: 'Slip Disc (Disc Herniation)',
    title: 'Slip Disc (Disc Herniation) Rehabilitation',
    description:
      'Structured rehab after disc-related back or leg symptoms—safe progression from acute care to strength.',
    image: serviceImageUrl('Slip Disc Treatment.png'),
    content: `Disc herniation can cause significant back or radiating leg pain. Many people improve substantially with time, education, and guided exercise.

We follow a phased plan: calm sensitive tissues, restore movement, then rebuild strength and resilience in the spine and hips.

You receive clear guidance on what to avoid temporarily and how to return to normal routines safely.`,
    treatments: [
      'Symptom-guided mobility and extension or flexion-based protocols as appropriate',
      'Progressive core and hip strengthening',
      'Neurodynamic techniques when suitable',
      'Return-to-work and sport planning',
    ],
  },
  {
    slug: 'sports-injury-rehabilitation',
    cardTitle: 'Sports Injury Rehabilitation',
    title: 'Sports Injury Rehabilitation',
    description:
      'Return-to-sport programs for strains, sprains, and overuse injuries across all levels.',
    image: serviceImageUrl('Sports Injury Rehabilitation.png'),
    content: `Sports injuries need more than rest—they need graded loading, power development, and confidence on change-of-direction and impact.

We align rehab with your sport demands, using objective milestones so return-to-play decisions feel transparent and safe.

From weekend athletes to active hobbyists, the focus is durable performance and injury prevention.`,
    treatments: [
      'Acute-phase protection and swelling management guidance',
      'Strength, plyometrics, and agility progressions',
      'Running or cutting mechanics (as relevant)',
      'Injury-prevention warm-up strategies',
    ],
  },
  {
    slug: 'post-fracture-rehabilitation',
    cardTitle: 'Post Fracture Rehabilitation',
    title: 'Post Fracture Rehabilitation',
    description:
      'Mobility and strengthening after cast removal or surgical fixation—aligned with your orthopaedic clearance.',
    image: serviceImageUrl('Post Fracture Rehabilitation.png'),
    content: `After a fracture, joints often feel stiff and muscles weaken from immobilization. Physiotherapy helps restore range, strength, and everyday function while respecting bone healing timelines.

We coordinate expectations with your doctor’s advice and progress exercises as tolerance improves.

The emphasis is safe, measurable gains in movement and load capacity.`,
    treatments: [
      'Joint mobilization and graded range-of-motion exercises',
      'Progressive resistance training',
      'Balance and weight-bearing retraining',
      'Functional tasks (stairs, carrying, reaching)',
    ],
  },
  {
    slug: 'paralysis-rehabilitation',
    cardTitle: 'Paralysis Rehabilitation',
    title: 'Paralysis Rehabilitation',
    description:
      'Neurological rehabilitation focused on mobility, transfers, and functional independence.',
    image: serviceImageUrl('Paralysis Rehabilitation.png'),
    content: `Neurological conditions require patient, repetitive, goal-directed training. We emphasize what you can actively participate in—whether that is strengthening available muscles, practicing transfers, or gait training with appropriate aids.

Family education and home programs extend therapy beyond the clinic where possible.

Every plan respects medical guidance and prioritizes safety and dignity.`,
    treatments: [
      'Task-specific motor practice',
      'Strength and endurance training within capacity',
      'Balance, transfer, and gait training',
      'Adaptive strategies and equipment advice',
    ],
  },
  {
    slug: 'arthritis',
    cardTitle: 'Arthritis (OA/RA)',
    title: 'Arthritis (OA/RA) Management',
    description:
      'Joint protection, pain modulation, and exercise for osteoarthritis and inflammatory arthritis.',
    image: serviceImageUrl('Arthritis Treatment.png'),
    content: `Arthritis can limit walking, gripping, and participation in daily life. Physiotherapy helps with joint mobility, surrounding muscle strength, and pacing strategies.

For inflammatory conditions, we work within your rheumatology plan, focusing on manageable movement and flare management.

The aim is less pain, more function, and sustainable activity levels.`,
    treatments: [
      'Low-impact aerobic and strengthening exercise',
      'Joint protection and ergonomic tips',
      'Hydrotherapy-style pacing (land-based equivalents)',
      'Collaboration with medical management for flares',
    ],
  },
  {
    slug: 'frozen-shoulder',
    cardTitle: 'Frozen Shoulder',
    title: 'Frozen Shoulder Treatment',
    description:
      'Phased care for adhesive capsulitis—pain relief, then restoration of shoulder range.',
    image: serviceImageUrl('Frozen Shoulder Therapy.png'),
    content: `Frozen shoulder progresses through painful and stiff phases. Treatment timing matters: early focus on pain modulation and gentle motion, later emphasis on progressive stretching and strengthening.

We set realistic timelines and home exercises matched to your stage.

Patience combined with the right loads usually restores useful shoulder function.`,
    treatments: [
      'Stage-appropriate stretching and mobilization',
      'Pain modulation strategies and activity modification',
      'Progressive strengthening as range improves',
      'Home exercise adherence planning',
    ],
  },
  {
    slug: 'muscle-pain',
    cardTitle: 'Muscle Pain',
    title: 'Muscle Pain Treatment',
    description:
      'Relief from muscle strains, trigger points, and overuse pain with manual therapy and exercise.',
    image: serviceImageUrl('Muscle Pain Therapy.png'),
    content: `Muscle pain may follow overload, poor recovery, stress-related tension, or repetitive tasks. We identify contributing habits and build resilience through graded loading and recovery strategies.

Manual therapy can ease acute symptoms while exercise maintains long-term results.

You leave with a clear understanding of how to stay active without re-aggravating tissues.`,
    treatments: [
      'Soft-tissue and manual techniques',
      'Eccentric and strength exercises for tendon and muscle capacity',
      'Load management and training adjustments',
      'Stretching and mobility for work and sport',
    ],
  },
  {
    slug: 'joint-stiffness',
    cardTitle: 'Joint Stiffness',
    title: 'Joint Stiffness Treatment',
    description:
      'Improve mobility and comfort when joints feel tight after injury, surgery, or inactivity.',
    image: serviceImageUrl('Joint Stiffness Treatment.png'),
    content: `Stiffness may follow immobilization, arthritis, or protective guarding. We combine joint mobilization principles with strengthening around the joint for stable, usable range.

Treatment is gentle but consistent—small daily gains add up.

We also address neighboring regions (hip/back/ankle) that often contribute to compensatory stiffness.`,
    treatments: [
      'Joint mobilization techniques (graded)',
      'Active range-of-motion and strengthening',
      'Flexibility routines for adjacent joints',
      'Functional movement retraining',
    ],
  },
]

/**
 * @param {string} slug
 * @returns {Service | undefined}
 */
export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug)
}
