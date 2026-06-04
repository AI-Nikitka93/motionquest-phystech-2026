# Judge Q&A Answer Bank

T155 coverage: medical claims, privacy, seated users, research evidence, business path and camera limits.

## Clinical Claims

**Q: Is this a medical device?**  
A: No. MotionQuest is a research-aligned hackathon browser release for movement practice feedback. It does not diagnose, predict fall risk, or replace clinical evaluation.

**Q: Are the scores clinically validated?**  
A: No. The metrics are inspired by functional movement and reach-practice constructs, but this app itself has not been clinically validated. That boundary is visible in the product and report.

## Accuracy

**Q: How accurate is the webcam tracking?**  
A: The browser release uses MediaPipe Pose and Hand Landmarker signals and reports tracking confidence. Standing mode requires usable body visibility; seated and Reach Stars paths rely on visible hand movement because close desk cameras often cannot show reliable lower-body landmarks. Accuracy depends on lighting, camera angle, body visibility, clothing, chair position, and user movement. The report explicitly labels low-confidence sessions.

**Q: Why not train your own AI model?**  
A: A custom model is not realistic or necessary for this hackathon MVP. The product value is in adaptive workflow, usable feedback, safety boundaries, and report interpretation built on existing browser landmark tracking.

## Accessibility

**Q: What if the user cannot stand?**  
A: That is why Activity 1 is now Adaptive Chair Movement. The user can choose `Seated adaptive`, and the app counts visible seated hand movement instead of forcing sit-to-stand.

**Q: Is the UI usable for older adults?**  
A: The UI uses large controls, high-contrast colors, explicit instructions, no hidden menus, no account setup, and a safe fallback report path.

## Privacy

**Q: Where does the video go?**  
A: Nowhere outside the browser. The app does not upload video, does not use a backend, and stores only session summaries in localStorage.

## Impact

**Q: Who benefits?**  
A: Older adults, seated users, caregivers, community wellness organizers, and physical-activity educators who need a low-friction way to start movement practice and communicate a session outcome.

**Q: What research evidence supports the idea?**
A: The evidence layer ties the browser release to older-adult exergame research, chair-based activity, functional-movement inspiration, MediaPipe landmark limits, and older-adult privacy/accessibility guidance. The app uses those sources to justify the workflow and boundaries, not to claim clinical validation.

## Creativity

**Q: Why is this not just another fitness game?**  
A: It is not built around leaderboards, calories, or generic gamification. The mechanics are tied to functional movement constructs, adaptive seated/standing paths, confidence-aware reporting, and visible research boundaries.

## Scalability

**Q: Can it scale beyond the demo?**  
A: The client-only architecture scales easily for access because there is no backend cost or account friction. The next real scaling work is not server scale; it is movement-protocol validation, camera setup guidance, and caregiver pilot feedback.

**Q: What is the business or adoption path?**
A: The practical wedge is community wellness and caregiver communication: a senior center, family caregiver, or wellness organizer can use a short session report without buying sensors or managing accounts. The current project does not claim paid demand or enterprise readiness.

## Risk

**Q: What can fail during the presentation?**  
A: Webcam permissions, room lighting, poor framing, or network access to model assets. The app includes camera recovery text and a clearly labeled safe-demo fallback, and the live demo script has a fallback branch.

**Q: What are the main camera limits?**
A: Standing mode needs a usable full-body frame. Seated and Reach Stars paths are more forgiving but still need at least one visible open hand. Close webcams, backlight, hands near the lens, cluttered backgrounds, and weak browser permission state can reduce confidence, so the report labels limitations instead of hiding them.
