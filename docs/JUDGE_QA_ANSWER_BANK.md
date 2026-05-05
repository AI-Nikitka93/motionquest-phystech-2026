# Judge Q&A Answer Bank

## Clinical Claims

**Q: Is this a medical device?**  
A: No. MotionQuest is a research-aligned hackathon prototype for movement practice feedback. It does not diagnose, predict fall risk, or replace clinical evaluation.

**Q: Are the scores clinically validated?**  
A: No. The metrics are inspired by functional movement and reach-practice constructs, but this app itself has not been clinically validated. That boundary is visible in the product and report.

## Accuracy

**Q: How accurate is the webcam tracking?**  
A: The prototype uses MediaPipe Pose landmarks and reports tracking confidence. Accuracy depends on lighting, camera angle, body visibility, clothing, chair position, and user movement. The report explicitly labels low-confidence sessions.

**Q: Why not train your own AI model?**  
A: A custom model is not realistic or necessary for this hackathon MVP. The product value is in adaptive workflow, usable feedback, safety boundaries, and report interpretation built on existing browser pose estimation.

## Accessibility

**Q: What if the user cannot stand?**  
A: That is why Activity 1 is now Adaptive Chair Movement. The user can choose `I will stay seated`, and the app counts seated upper-body movement instead of forcing sit-to-stand.

**Q: Is the UI usable for older adults?**  
A: The UI uses large controls, high-contrast colors, explicit instructions, no hidden menus, no account setup, and a safe fallback report path.

## Privacy

**Q: Where does the video go?**  
A: Nowhere outside the browser. The app does not upload video, does not use a backend, and stores only session summaries in localStorage.

## Impact

**Q: Who benefits?**  
A: Older adults, seated users, caregivers, community wellness organizers, and physical-activity educators who need a low-friction way to start movement practice and communicate a session outcome.

## Creativity

**Q: Why is this not just another fitness game?**  
A: It is not built around leaderboards, calories, or generic gamification. The mechanics are tied to functional movement constructs, adaptive seated/standing paths, confidence-aware reporting, and visible research boundaries.

## Scalability

**Q: Can it scale beyond the demo?**  
A: The client-only architecture scales easily for access because there is no backend cost or account friction. The next real scaling work is not server scale; it is movement-protocol validation, camera setup guidance, and caregiver pilot feedback.

## Risk

**Q: What can fail during the presentation?**  
A: Webcam permissions, room lighting, poor framing, or network access to model assets. The app includes camera recovery text and a clearly labeled safe-demo fallback, and the live demo script has a fallback branch.
