import { useState } from "react";

const scenarios = [
{
id: "enrollment",
icon: "📋",
title: "Enrollment & Credits",
subtitle: "Am I taking the right number of credits?",
color: "#1a4a6b",
tree: {
question: "What semester is it right now?",
options: [
{ label: "Fall or Spring (regular semester)", next: "fall_spring_enrolled" },
{ label: "Summer", next: "summer" },
],
},
nodes: {
fall_spring_enrolled: {
question: "Are you currently enrolled in classes?",
options: [
{ label: "Yes", next: "fall_spring_credits" },
{ label: "No — I withdrew from all classes", next: "not_enrolled" },
],
},
fall_spring_credits: {
question: "How many total credits are you registered for?",
options: [
{ label: "12 or more", next: "check_online" },
{ label: "Less than 12", next: "under_12" },
],
},
check_online: {
question: "How many of those credits are online (distance education)?",
options: [
{ label: "3 or fewer", next: "good_standing" },
{ label: "More than 3", next: "too_many_online" },
],
},
good_standing: {
result: true, type: "ok",
title: "You're in good shape!",
message: "You meet the full-time enrollment requirement for F-1 status. You have 12+ credits and no more than 3 online. Keep it up — and let your advisor know before you make any schedule changes.",
},
too_many_online: {
result: true, type: "urgent",
title: "Too many online credits",
message: "F-1 students can only count up to 3 online credits toward the full-time requirement. You need to swap one online class for an in-person class. Contact your advisor right away — this needs to be fixed before the semester deadline.",
action: "Email your DSO: dhu@nvcc.edu",
},
under_12: {
question: "Do you have an approved Reduced Course Load (RCL) on file with your advisor?",
options: [
{ label: "Yes, my advisor approved it in writing", next: "rcl_approved" },
{ label: "No", next: "need_rcl" },
],
},
rcl_approved: {
result: true, type: "ok",
title: "You're covered — for now",
message: "If your RCL is officially documented and approved by your DSO in SEVIS, you're okay for this semester. Make sure you have written confirmation. If you're not 100% sure, ask.",
},
need_rcl: {
result: true, type: "urgent",
title: "Contact your advisor today",
message: "Taking fewer than 12 credits without an approved RCL puts your F-1 status at risk. You need to either add credits to reach 12, or get an RCL authorized immediately. Don't wait on this one.",
action: "Email your DSO: dhu@nvcc.edu",
},
not_enrolled: {
result: true, type: "urgent",
title: "This is urgent — contact your advisor now",
message: "F-1 students must be enrolled full-time during fall and spring semesters. If you withdrew from all classes, your status may already be at risk. Contact your advisor today — not tomorrow.",
action: "Email your DSO: dhu@nvcc.edu",
},
summer: {
result: true, type: "ok",
title: "Summer is usually optional",
message: "Most F-1 students are not required to enroll in summer. As long as you were full-time in spring and plan to be full-time in fall, you're fine to take the summer off. That said, if this is your final semester or you have CPT, different rules may apply. When in doubt, ask.",
},
},
},
{
id: "opt",
icon: "💼",
title: "OPT",
subtitle: "Work authorization after graduation",
color: "#2d6a4f",
tree: {
question: "Where are you in your program?",
options: [
{ label: "Still enrolled, haven't graduated yet", next: "pre_completion" },
{ label: "Graduating within the next 90 days", next: "about_to_graduate" },
{ label: "Already graduated", next: "post_grad" },
],
},
nodes: {
pre_completion: {
question: "Have you completed at least one full academic year at NOVA?",
options: [
{ label: "Yes", next: "pre_opt_eligible" },
{ label: "No", next: "not_eligible_yet" },
],
},
pre_opt_eligible: {
result: true, type: "info",
title: "You may be eligible for pre-completion OPT",
message: "Pre-completion OPT lets you work part-time (up to 20 hrs/week) while still enrolled. Keep in mind: it uses up part of your 12-month OPT authorization, so think carefully before applying. Talk to your advisor about whether this makes sense for your situation.",
action: "Email your DSO: dhu@nvcc.edu",
},
not_eligible_yet: {
result: true, type: "info",
title: "Not yet — but you're getting there",
message: "You need to complete one full academic year (two semesters) at NOVA before you can apply for OPT. Keep working toward that and come talk to your advisor when you're getting close to the one-year mark.",
},
about_to_graduate: {
result: true, type: "urgent",
title: "Apply now — timing is everything with OPT",
message: "You can apply up to 90 days before your graduation date, and no later than 60 days after. USCIS processing can take 3 to 5 months, so the earlier the better. You need a new I-20 with an OPT recommendation from your DSO before you file. Do not start working until you have your EAD card in hand.",
action: "Email your DSO: dhu@nvcc.edu",
},
post_grad: {
question: "What is your OPT status right now?",
options: [
{ label: "I applied and I'm waiting for my EAD", next: "waiting_ead" },
{ label: "I haven't applied yet", next: "post_grad_apply" },
{ label: "I have my EAD", next: "have_ead" },
],
},
waiting_ead: {
result: true, type: "ok",
title: "Hang tight — and track your unemployment days",
message: "You're in your 60-day grace period after graduation. Once your OPT start date begins, you have a total of 90 unemployment days you can use during your OPT period. Keep track — they count even while you're waiting on job applications.",
},
post_grad_apply: {
question: "How long ago did you graduate?",
options: [
{ label: "Less than 60 days ago", next: "still_can_apply" },
{ label: "More than 60 days ago", next: "too_late" },
],
},
still_can_apply: {
result: true, type: "urgent",
title: "Apply now — don't wait another day",
message: "You still have time, but the window is closing fast. Contact your advisor today to get your OPT I-20. Then submit your USCIS application right away.",
action: "Email your DSO: dhu@nvcc.edu",
},
too_late: {
result: true, type: "urgent",
title: "Contact your advisor immediately",
message: "The OPT application window has likely closed. This is a serious situation. Contact your advisor today to talk through your options, which may include a school transfer or preparing to depart the US.",
action: "Email your DSO: dhu@nvcc.edu",
},
have_ead: {
result: true, type: "ok",
title: "You're authorized to work!",
message: "You can work in your field — make sure the job is related to your degree. Remember: you have 90 total unemployment days during your OPT period. Report any address or employer changes to your DSO within 10 days.",
},
},
},
{
id: "cpt",
icon: "🎓",
title: "CPT",
subtitle: "Work while you're still enrolled",
color: "#6b3a1a",
tree: {
question: "Do you have a job or internship offer?",
options: [
{ label: "Yes, I have an offer", next: "have_offer" },
{ label: "No, just exploring my options", next: "exploring" },
],
},
nodes: {
have_offer: {
question: "Is the internship or job directly related to your major?",
options: [
{ label: "Yes, it's in my field", next: "check_year" },
{ label: "Probably not", next: "not_related" },
{ label: "Not sure", next: "check_with_advisor" },
],
},
check_year: {
question: "Have you completed at least one full academic year at NOVA?",
options: [
{ label: "Yes", next: "check_curriculum" },
{ label: "No", next: "need_year" },
],
},
check_curriculum: {
question: "Is this internship a required or listed elective part of your degree program?",
options: [
{ label: "Yes, it's in my degree requirements", next: "cpt_eligible" },
{ label: "I'm not sure", next: "check_with_advisor" },
{ label: "No, it's a separate opportunity", next: "not_eligible" },
],
},
cpt_eligible: {
result: true, type: "ok",
title: "You may be eligible for CPT",
message: "Good news. Contact your advisor to start the process. You will need documentation from your employer and your academic department. CPT must be authorized on your I-20 before your first day of work — never start without it.",
action: "Email your DSO: dhu@nvcc.edu",
},
check_with_advisor: {
result: true, type: "info",
title: "Talk to your advisor first",
message: "CPT eligibility depends on specifics that your advisor needs to review. Bring your job offer letter and your degree plan to the appointment. Don't accept the offer or start work until you have CPT authorization on your I-20.",
action: "Email your DSO: dhu@nvcc.edu",
},
not_related: {
result: true, type: "warning",
title: "CPT must be tied to your major",
message: "CPT is only for work that is an integral part of your academic program. If the job isn't in your field, it likely won't qualify. Talk to your advisor before you turn down the offer — there may be more to consider.",
action: "Email your DSO: dhu@nvcc.edu",
},
need_year: {
result: true, type: "warning",
title: "Not yet — you need one full academic year first",
message: "F-1 students generally need to complete one full academic year before CPT is available. Keep this in mind when planning internship timelines.",
},
not_eligible: {
result: true, type: "warning",
title: "CPT probably isn't the right fit here",
message: "For CPT to work, the internship has to be a required or elective part of your degree, you have to be enrolled full-time, and the program needs to be listed in the catalog as including practical training. If this doesn't match, talk to your advisor — they may know other options.",
action: "Email your DSO: dhu@nvcc.edu",
},
exploring: {
result: true, type: "info",
title: "Here's the short version on CPT",
message: "CPT lets you work off-campus in a job related to your major while you're still enrolled. Key requirements: one full academic year completed, enrolled full-time, the internship is part of your curriculum, and your advisor authorizes it on your I-20 before you start. Talk to your academic advisor and DSO before you apply for internships.",
},
},
},
{
id: "travel",
icon: "✈️",
title: "Travel",
subtitle: "Leaving and returning to the US",
color: "#4a1a6b",
tree: {
question: "Where are you right now?",
options: [
{ label: "I'm in the US and planning to travel", next: "planning_travel" },
{ label: "I'm outside the US and trying to return", next: "returning" },
],
},
nodes: {
planning_travel: {
question: "Is your I-20 travel signature current? (Must be signed within the last 12 months — or 6 months if you're on OPT)",
options: [
{ label: "Yes, the signature is current", next: "check_visa" },
{ label: "No, or I'm not sure", next: "need_signature" },
],
},
check_visa: {
question: "Is your F-1 visa still valid (not expired)?",
options: [
{ label: "Yes, still valid", next: "ready_to_travel" },
{ label: "No, it's expired", next: "expired_visa" },
],
},
ready_to_travel: {
result: true, type: "ok",
title: "You should be good to go",
message: "Make sure you travel with: your valid passport, your valid F-1 visa, your current I-20 with a current travel signature, and your enrollment verification or offer letter in case you're asked at the border. Have a safe trip!",
},
expired_visa: {
result: true, type: "warning",
title: "You'll need a new visa before you return",
message: "Your F-1 visa only matters at the port of entry — it gets you back into the US. If it's expired, you'll need to apply for a new one at a US consulate before you come back. Plan extra time for that. Canadian citizens are typically an exception. Talk to your advisor before you leave.",
action: "Email your DSO: dhu@nvcc.edu",
},
need_signature: {
result: true, type: "warning",
title: "Get your travel signature updated first",
message: "Contact your DSO to get a new travel signature on your I-20. Without a current signature, you may have trouble re-entering the US. This is quick to fix — just give your advisor a heads up before your trip.",
action: "Email your DSO: dhu@nvcc.edu",
},
returning: {
question: "Do you have all three of these: valid passport, valid F-1 visa, and a current I-20 travel signature?",
options: [
{ label: "Yes, all three are good", next: "returning_ok" },
{ label: "My visa is expired", next: "returning_expired_visa" },
{ label: "My I-20 travel signature is outdated", next: "returning_old_signature" },
{ label: "Something else is missing", next: "returning_contact" },
],
},
returning_ok: {
result: true, type: "ok",
title: "You're set to return",
message: "You have everything you need. At the port of entry, be ready to show your I-20, passport, and visa. Answer questions calmly and honestly. Welcome back!",
},
returning_expired_visa: {
result: true, type: "urgent",
title: "Renew your visa before trying to enter the US",
message: "An expired F-1 visa means you cannot re-enter the US until you get a new one from a US consulate. Contact your advisor for a support letter and guidance on the visa appointment process.",
action: "Email your DSO: dhu@nvcc.edu",
},
returning_old_signature: {
result: true, type: "urgent",
title: "Contact your advisor before trying to re-enter",
message: "You may be denied entry without a current I-20 travel signature. Contact your DSO and ask for an updated I-20 — they can send it electronically. Do not attempt to re-enter with an outdated signature.",
action: "Email your DSO: dhu@nvcc.edu",
},
returning_contact: {
result: true, type: "urgent",
title: "Reach out to your advisor right away",
message: "Something is missing and it's important to get it sorted before you travel. Contact your DSO now and explain your situation in detail.",
action: "Email your DSO: dhu@nvcc.edu",
},
},
},
{
id: "rcl",
icon: "📉",
title: "Reduced Course Load",
subtitle: "Can I take fewer than 12 credits?",
color: "#1a5f6b",
tree: {
question: "Why do you need to take fewer than 12 credits?",
options: [
{ label: "Medical reason (physical or mental health)", next: "medical" },
{ label: "Academic difficulty in my first semester, or I was placed in the wrong course level", next: "academic" },
{ label: "Final semester — I only need a few credits to finish", next: "final_semester" },
{ label: "Another reason (work, finances, personal)", next: "other" },
],
},
nodes: {
medical: {
result: true, type: "info",
title: "Medical RCL is possible — but you need documentation",
message: "You can get a medical RCL with a letter from a licensed doctor or counselor recommending reduced enrollment. This cannot be self-diagnosed or self-reported. Bring the letter to your DSO — they will authorize the RCL in SEVIS. This is available for up to 12 months of your program.",
action: "Email your DSO: dhu@nvcc.edu",
},
academic: {
result: true, type: "info",
title: "Academic RCL — available, but limited",
message: "Academic difficulty RCL is only available once per program, and only in your first semester or if you were placed at the wrong course level. It is not something you can use every semester. Talk to your advisor to confirm you qualify.",
action: "Email your DSO: dhu@nvcc.edu",
},
final_semester: {
result: true, type: "ok",
title: "Final semester exception may apply",
message: "If you only need a few credits to complete your program, you may qualify for a final semester exception — even if those credits put you below full-time. Talk to your DSO to confirm and make sure it is documented on your I-20.",
action: "Email your DSO: dhu@nvcc.edu",
},
other: {
result: true, type: "urgent",
title: "This one's a hard no — talk to your advisor first",
message: "Work, finances, and personal reasons do not qualify for an RCL under F-1 rules. Taking fewer than 12 credits without an approved RCL is an enrollment violation. Do not drop classes without talking to your DSO first. The only valid reasons are medical, academic difficulty in your first semester, or final semester.",
action: "Email your DSO: dhu@nvcc.edu",
},
},
},
{
id: "extension",
icon: "📅",
title: "Program Extension",
subtitle: "My program end date is coming up",
color: "#5a6b1a",
tree: {
question: "When is your I-20 program end date?",
options: [
{ label: "More than 3 months away", next: "not_urgent" },
{ label: "Within the next 1 to 3 months", next: "getting_close" },
{ label: "It has already passed", next: "already_passed" },
],
},
nodes: {
not_urgent: {
result: true, type: "ok",
title: "No rush — but keep it on your radar",
message: "You have time, but don't wait until the last minute. If you know you'll need more time to finish, start the conversation with your advisor at least 60 days before your end date. Extensions require documentation and a clear reason.",
},
getting_close: {
question: "Will you finish your program by the current end date on your I-20?",
options: [
{ label: "Yes, I'll finish on time", next: "finish_on_time" },
{ label: "No, I need more time", next: "need_extension" },
],
},
finish_on_time: {
result: true, type: "ok",
title: "You're on track",
message: "As long as you finish by your I-20 program end date, you're fine. After you complete your program, you have a 60-day grace period. Use that time to prepare for departure, transfer to another school, or apply for OPT if eligible.",
},
need_extension: {
result: true, type: "urgent",
title: "Request an extension now — before it's too late",
message: "Extensions must be requested before your program end date, not after. You will need documentation showing why you need more time — usually a letter from your academic advisor confirming remaining coursework. Contact your DSO today.",
action: "Email your DSO: dhu@nvcc.edu",
},
already_passed: {
result: true, type: "urgent",
title: "This is serious — contact your advisor today",
message: "If your program end date has passed without an extension, you may already be out of status. Do not ignore this. Contact your DSO immediately to go over your options, which may include reinstatement.",
action: "Email your DSO: dhu@nvcc.edu",
},
},
},
{
id: "sevis",
icon: "⚠️",
title: "SEVIS Termination",
subtitle: "My status was terminated — what do I do?",
color: "#6b1a1a",
tree: {
question: "Do you know why your SEVIS record was terminated?",
options: [
{ label: "Enrollment violation (dropped below full-time, too many online credits)", next: "enrollment_term" },
{ label: "Failure to report (address, etc.)", next: "reporting_term" },
{ label: "I'm not sure why", next: "not_sure" },
{ label: "I think it was a mistake", next: "possible_error" },
],
},
nodes: {
enrollment_term: {
result: true, type: "urgent",
title: "You need to act — and quickly",
message: "Termination for an enrollment violation is serious. You are out of status right now. You have two main paths: reinstatement (a USCIS application that takes several months), or departing the US and re-entering on a new SEVIS record if your school can issue one. Do not stay in the US without a clear plan. Contact your advisor today.",
action: "Email your DSO: dhu@nvcc.edu",
},
reporting_term: {
result: true, type: "urgent",
title: "Contact your advisor right away",
message: "Failure to report (like not updating your address within 10 days) can lead to termination. Depending on the circumstances, your advisor may be able to help correct the record, or you may need to reinstate. Either way, this needs immediate attention.",
action: "Email your DSO: dhu@nvcc.edu",
},
not_sure: {
result: true, type: "urgent",
title: "Find out before you do anything else",
message: "The reason for termination determines your options. Contact your DSO immediately. Do not travel outside the US while your SEVIS record is terminated — re-entry would be denied.",
action: "Email your DSO: dhu@nvcc.edu",
},
possible_error: {
result: true, type: "urgent",
title: "Still urgent — even if it's a mistake",
message: "Even a mistaken termination has to be corrected through official channels. Your DSO may be able to reinstate your SEVIS record with a notation. This is not something you can fix on your own. Contact your advisor today and bring any documentation that supports the error.",
action: "Email your DSO: dhu@nvcc.edu",
},
},
},
];

const illustrations = {
  enrollment: (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#dce8f0" rx="10"/>
      {/* Shelf line */}
      <rect x="40" y="100" width="220" height="3" fill="#b0c8da" rx="1.5"/>
      {/* Book 1 — tall, navy */}
      <rect x="78" y="50" width="22" height="50" fill="#1a4a6b" rx="2"/>
      <rect x="78" y="50" width="22" height="7" fill="#2d6a9b" rx="2"/>
      {/* Spine lines */}
      <line x1="84" y1="62" x2="84" y2="95" stroke="#0e3050" strokeWidth="1" opacity="0.3"/>
      {/* Book 2 — medium, slate */}
      <rect x="104" y="62" width="18" height="38" fill="#4a7fa0" rx="2"/>
      <rect x="104" y="62" width="18" height="6" fill="#6a9fbe" rx="2"/>
      {/* Book 3 — shorter, pale blue */}
      <rect x="126" y="70" width="20" height="30" fill="#8ab4cc" rx="2"/>
      {/* Horizontal stack */}
      <rect x="152" y="90" width="50" height="10" fill="#1a4a6b" rx="2"/>
      <rect x="154" y="81" width="46" height="10" fill="#3a6a8b" rx="2"/>
      <rect x="157" y="72" width="40" height="10" fill="#6a9ab8" rx="2"/>
      {/* Pencil */}
      <g transform="rotate(14 215 74)">
        <rect x="207" y="44" width="8" height="48" fill="#f0c060" rx="2"/>
        <polygon points="207,92 211,92 209,101" fill="#c87040"/>
        <rect x="207" y="44" width="8" height="7" fill="#f0e0c0" rx="1"/>
        <rect x="207" y="51" width="8" height="3" fill="#e0b040"/>
      </g>
      {/* Small eraser */}
      <rect x="207" y="44" width="8" height="5" fill="#e89898" rx="1" transform="rotate(14 215 74)"/>
    </svg>
  ),

  opt: (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#dceee6" rx="10"/>
      {/* Building silhouettes */}
      <rect x="18" y="68" width="32" height="62" fill="#b0cebf" rx="2"/>
      <rect x="28" y="54" width="14" height="16" fill="#b0cebf" rx="1"/>
      {/* Windows */}
      <rect x="22" y="74" width="6" height="6" fill="#dceee6" rx="1" opacity="0.7"/>
      <rect x="32" y="74" width="6" height="6" fill="#dceee6" rx="1" opacity="0.7"/>
      <rect x="22" y="84" width="6" height="6" fill="#dceee6" rx="1" opacity="0.7"/>
      <rect x="32" y="84" width="6" height="6" fill="#dceee6" rx="1" opacity="0.7"/>
      <rect x="50" y="58" width="28" height="72" fill="#98bca8" rx="2"/>
      <rect x="55" y="64" width="6" height="6" fill="#dceee6" rx="1" opacity="0.6"/>
      <rect x="65" y="64" width="6" height="6" fill="#dceee6" rx="1" opacity="0.6"/>
      <rect x="55" y="74" width="6" height="6" fill="#dceee6" rx="1" opacity="0.6"/>
      <rect x="65" y="74" width="6" height="6" fill="#dceee6" rx="1" opacity="0.6"/>
      <rect x="240" y="62" width="30" height="68" fill="#a8c8b6" rx="2"/>
      <rect x="248" y="48" width="14" height="16" fill="#a8c8b6" rx="1"/>
      <rect x="222" y="74" width="20" height="56" fill="#bcd6c8" rx="2"/>
      {/* Briefcase */}
      <rect x="108" y="52" width="84" height="64" fill="#2d6a4f" rx="8"/>
      <rect x="108" y="80" width="84" height="3" fill="#1d4a38"/>
      {/* Handle */}
      <path d="M132 52 Q132 38 150 38 Q168 38 168 52" fill="none" stroke="#2d6a4f" strokeWidth="5" strokeLinecap="round"/>
      {/* Latch */}
      <rect x="143" y="73" width="14" height="18" fill="#1d4a38" rx="3"/>
      <rect x="146" y="76" width="8" height="4" fill="#4a8a6a" rx="1"/>
      {/* Rising dots path */}
      <circle cx="88" cy="44" r="3" fill="#4a9a6f" opacity="0.45"/>
      <circle cx="97" cy="35" r="3" fill="#4a9a6f" opacity="0.45"/>
      <circle cx="107" cy="28" r="2.5" fill="#4a9a6f" opacity="0.35"/>
    </svg>
  ),

  cpt: (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#ede5dc" rx="10"/>
      {/* Ground */}
      <ellipse cx="150" cy="114" rx="110" ry="7" fill="#c8b8a0" opacity="0.45"/>
      {/* Left tree — soft organic blob, no sharp edges */}
      <ellipse cx="58" cy="74" rx="26" ry="22" fill="#6a8c52"/>
      <ellipse cx="48" cy="79" rx="20" ry="18" fill="#598044"/>
      <ellipse cx="66" cy="76" rx="22" ry="19" fill="#7a9c62"/>
      <ellipse cx="58" cy="67" rx="18" ry="16" fill="#638c4e"/>
      <ellipse cx="63" cy="80" rx="14" ry="12" fill="#729858"/>
      <rect x="54" y="92" width="8" height="20" fill="#8a6040" rx="3"/>
      {/* Right tree — soft organic blob */}
      <ellipse cx="242" cy="72" rx="28" ry="23" fill="#5a7c46"/>
      <ellipse cx="232" cy="77" rx="22" ry="19" fill="#4a6c38"/>
      <ellipse cx="250" cy="74" rx="24" ry="20" fill="#6a8c56"/>
      <ellipse cx="242" cy="65" rx="19" ry="17" fill="#608848"/>
      <ellipse cx="247" cy="78" rx="15" ry="13" fill="#70985a"/>
      <rect x="238" y="91" width="8" height="20" fill="#7a5035" rx="3"/>
      {/* Path between trees */}
      <path d="M100 114 Q150 98 200 114" fill="#d4c0a0" opacity="0.6"/>
      {/* Graduation cap */}
      <polygon points="150,36 118,54 182,54" fill="#6b3a1a"/>
      <rect x="118" y="52" width="64" height="9" fill="#7a4a28" rx="1"/>
      {/* Tassel string */}
      <line x1="182" y1="54" x2="185" y2="70" stroke="#8a5030" strokeWidth="2.5"/>
      <circle cx="185" cy="73" r="4" fill="#c49040"/>
      {/* Diploma scroll below cap */}
      <rect x="132" y="74" width="36" height="26" fill="#f5e8d0" rx="4" stroke="#c8a870" strokeWidth="1"/>
      <path d="M132 82 Q150 86 168 82" fill="none" stroke="#c8a870" strokeWidth="1" opacity="0.6"/>
      <line x1="138" y1="88" x2="162" y2="88" stroke="#c8a870" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),

  travel: (
    /* Bird watching — very understated, almost whispered */
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#eae7f0" rx="10"/>
      {/* Barely-there sky wash */}
      <rect width="300" height="85" fill="#e4e0ee" rx="10"/>
      {/* Soft horizon */}
      <path d="M0 98 Q75 93 150 98 Q225 103 300 98 L300 130 L0 130 Z" fill="#d4cee4" opacity="0.22"/>
      {/* Lead bird */}
      <path d="M145 50 Q153 45 161 50" stroke="#8878b0" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.45"/>
      {/* Second pair */}
      <path d="M122 60 Q129 55 136 60" stroke="#9888be" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.32"/>
      <path d="M166 62 Q173 57 180 62" stroke="#9888be" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.32"/>
      {/* Third pair — barely visible */}
      <path d="M100 69 Q106 65 112 69" stroke="#a898cc" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2"/>
      <path d="M190 70 Q196 66 202 70" stroke="#a898cc" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2"/>
    </svg>
  ),

  rcl: (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#daeef0" rx="10"/>
      {/* Bench back */}
      <rect x="78" y="78" width="144" height="5" fill="#90bcbe" rx="2.5"/>
      {/* Bench seat */}
      <rect x="78" y="90" width="144" height="7" fill="#a0ccd0" rx="3"/>
      {/* Bench legs */}
      <rect x="92" y="95" width="7" height="22" fill="#88b4b8" rx="2"/>
      <rect x="201" y="95" width="7" height="22" fill="#88b4b8" rx="2"/>
      {/* Person — sitting, relaxed */}
      {/* Head */}
      <circle cx="150" cy="52" r="13" fill="#c8905c"/>
      {/* Body */}
      <rect x="138" y="64" width="24" height="28" fill="#1a5f6b" rx="6"/>
      {/* Legs hanging */}
      <rect x="138" y="88" width="10" height="20" fill="#1a5f6b" rx="4"/>
      <rect x="152" y="88" width="10" height="20" fill="#1a5f6b" rx="4"/>
      {/* Feet */}
      <ellipse cx="143" cy="108" rx="7" ry="4" fill="#1a4a55"/>
      <ellipse cx="157" cy="108" rx="7" ry="4" fill="#1a4a55"/>
      {/* Arm holding 2 books */}
      <rect x="114" y="70" width="26" height="8" fill="#1a5f6b" rx="3"/>
      {/* Book stack in arm */}
      <rect x="94" y="66" width="14" height="18" fill="#4a9aaa" rx="2"/>
      <rect x="88" y="70" width="14" height="16" fill="#2a7a8a" rx="2"/>
    </svg>
  ),

  extension: (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#e8edda" rx="10"/>
      {/* Calendar body */}
      <rect x="70" y="24" width="96" height="90" fill="#fff" rx="7" stroke="#c0cc90" strokeWidth="1.5"/>
      {/* Calendar header */}
      <rect x="70" y="24" width="96" height="24" fill="#5a6b1a" rx="7"/>
      <rect x="70" y="40" width="96" height="8" fill="#5a6b1a"/>
      {/* Ring holes */}
      <circle cx="100" cy="24" r="4.5" fill="#e8edda"/>
      <circle cx="136" cy="24" r="4.5" fill="#e8edda"/>
      {/* Month label */}
      <rect x="88" y="30" width="60" height="5" fill="#b0c870" rx="2" opacity="0.6"/>
      {/* Grid lines */}
      <line x1="94" y1="56" x2="94" y2="108" stroke="#d8e0c0" strokeWidth="1"/>
      <line x1="116" y1="56" x2="116" y2="108" stroke="#d8e0c0" strokeWidth="1"/>
      <line x1="138" y1="56" x2="138" y2="108" stroke="#d8e0c0" strokeWidth="1"/>
      <line x1="70" y1="70" x2="166" y2="70" stroke="#d8e0c0" strokeWidth="1"/>
      <line x1="70" y1="84" x2="166" y2="84" stroke="#d8e0c0" strokeWidth="1"/>
      <line x1="70" y1="98" x2="166" y2="98" stroke="#d8e0c0" strokeWidth="1"/>
      {/* Highlighted end-date circle */}
      <circle cx="152" cy="101" r="11" fill="#6a7c20" opacity="0.9"/>
      <line x1="148" y1="101" x2="156" y2="101" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="152" y1="97" x2="152" y2="105" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      {/* Curved arrow extending forward */}
      <path d="M168 84 Q200 68 222 52" stroke="#8a9a30" strokeWidth="2.5" fill="none" strokeDasharray="5,4" strokeLinecap="round" opacity="0.8"/>
      <polygon points="217,46 226,54 212,57" fill="#8a9a30" opacity="0.8"/>
    </svg>
  ),

  sevis: (
    <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <rect width="300" height="130" fill="#f0e2e2" rx="10"/>
      {/* Document */}
      <rect x="88" y="16" width="84" height="104" fill="#fff" rx="5" stroke="#e0baba" strokeWidth="1.5"/>
      {/* Folded corner */}
      <path d="M155 16 L172 16 L172 33 Z" fill="#f0e2e2"/>
      <path d="M155 16 L172 33 L155 33 Z" fill="#e8d0d0" stroke="#e0baba" strokeWidth="1"/>
      {/* Document text lines */}
      <rect x="100" y="44" width="56" height="4" fill="#e8c8c8" rx="2"/>
      <rect x="100" y="54" width="52" height="4" fill="#e8c8c8" rx="2"/>
      <rect x="100" y="64" width="48" height="4" fill="#e8c8c8" rx="2"/>
      <rect x="100" y="74" width="54" height="4" fill="#e8c8c8" rx="2"/>
      {/* Red stamp circle */}
      <circle cx="148" cy="95" r="18" fill="#c0303030" opacity="0.12"/>
      <circle cx="148" cy="95" r="18" fill="none" stroke="#c03030" strokeWidth="2" opacity="0.65"/>
      <circle cx="148" cy="95" r="13" fill="none" stroke="#c03030" strokeWidth="1" opacity="0.3"/>
      {/* X in stamp */}
      <line x1="139" y1="86" x2="157" y2="104" stroke="#c03030" strokeWidth="3" strokeLinecap="round" opacity="0.75"/>
      <line x1="157" y1="86" x2="139" y2="104" stroke="#c03030" strokeWidth="3" strokeLinecap="round" opacity="0.75"/>
      {/* Warning triangle beside document */}
      <path d="M198 52 L226 98 L170 98 Z" fill="#e84040" opacity="0.12"/>
      <path d="M198 52 L226 98 L170 98 Z" fill="none" stroke="#c03030" strokeWidth="2" opacity="0.65"/>
      <line x1="198" y1="65" x2="198" y2="82" stroke="#c03030" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>
      <circle cx="198" cy="90" r="2.5" fill="#c03030" opacity="0.75"/>
    </svg>
  ),
};

const typeConfig = {
ok: { icon: "✅", label: "You're good", color: "#1a6b3a", bg: "#f0faf4", border: "#86efac" },
warning: { icon: "⚠️", label: "Heads up", color: "#7a5c00", bg: "#fffbea", border: "#fcd34d" },
urgent: { icon: "🚨", label: "Action needed", color: "#7a1a1a", bg: "#fff5f5", border: "#fca5a5" },
info: { icon: "ℹ️", label: "Good to know", color: "#1a3a7a", bg: "#f0f5ff", border: "#93c5fd" },
};

export default function F1Navigator() {
const [active, setActive] = useState(null);
const [history, setHistory] = useState([]);
const [nodeId, setNodeId] = useState("start");

const open = (s) => { setActive(s); setHistory([]); setNodeId("start"); };
const close = () => { setActive(null); setHistory([]); setNodeId("start"); };

const getNode = (s, id) => id === "start" ? s.tree : s.nodes[id];

const choose = (next) => {
setHistory(h => [...h, nodeId]);
setNodeId(next);
};

const back = () => {
if (!history.length) return;
setNodeId(history[history.length - 1]);
setHistory(h => h.slice(0, -1));
};

const restart = () => { setHistory([]); setNodeId("start"); };

const node = active ? getNode(active, nodeId) : null;

return (
<div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f4f1ec" }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap'); * { box-sizing: border-box; } .card-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.12) !important; } .opt-btn:hover { border-color: var(--hover-color) !important; background: var(--hover-bg) !important; } .back-link:hover { opacity: 0.7; }`}</style>

  {/* Header */}
  <div style={{ background: "#162e45", padding: "1.75rem 1.5rem", textAlign: "center" }}>
    <div style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>🧭</div>
    <h1 style={{ fontFamily: "'Lora', serif", color: "#fff", fontSize: "1.6rem", margin: "0 0 0.3rem" }}>
      F-1 Student Navigator
    </h1>
    <p style={{ color: "#8fb3cc", margin: 0, fontSize: "0.88rem" }}>
      NOVA International Student Services &nbsp;·&nbsp; dhu@nvcc.edu
    </p>
  </div>

  {!active ? (
    /* Dashboard */
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1rem" }}>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem", fontSize: "0.97rem" }}>
        Pick the situation that fits your question — we'll walk you through it step by step.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
        {scenarios.map(s => (
          <button
            key={s.id}
            className="card-btn"
            onClick={() => open(s)}
            style={{
              background: "#fff",
              border: "1.5px solid #e8e2d8",
              borderRadius: "14px",
              padding: 0,
              textAlign: "left",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              borderTop: `4px solid ${s.color}`,
              overflow: "hidden",
            }}
          >
            {/* Illustration header */}
            <div style={{ borderRadius: "0", overflow: "hidden", lineHeight: 0 }}>
              {illustrations[s.id]}
            </div>
            {/* Card body */}
            <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
              <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, color: s.color, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                {s.title}
              </div>
              <div style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.4 }}>{s.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
      <p style={{ textAlign: "center", color: "#bbb", marginTop: "2.5rem", fontSize: "0.78rem" }}>
        This tool is for general guidance only. For your specific situation, always contact your advisor.
      </p>
    </div>
  ) : (
    /* Decision tree */
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1.75rem 1rem" }}>
      <button className="back-link" onClick={close} style={{ background: "none", border: "none", color: "#162e45", cursor: "pointer", fontSize: "0.87rem", padding: 0, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.3rem", opacity: 0.8, transition: "opacity 0.15s" }}>
        ← All topics
      </button>

      {/* Illustration + scenario label */}
      <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", marginBottom: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `4px solid ${active.color}` }}>
        <div style={{ lineHeight: 0 }}>
          {illustrations[active.id]}
        </div>
        <div style={{ padding: "0.9rem 1.1rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <span style={{ fontSize: "1.5rem" }}>{active.icon}</span>
          <div>
            <div style={{ fontFamily: "'Lora', serif", color: active.color, fontWeight: 700, fontSize: "1.1rem" }}>{active.title}</div>
            <div style={{ color: "#888", fontSize: "0.82rem" }}>{active.subtitle}</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      {history.length > 0 && (
        <div style={{ display: "flex", gap: "5px", marginBottom: "1rem", alignItems: "center" }}>
          {history.map((_, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: active.color, opacity: 0.35 }} />
          ))}
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: active.color }} />
        </div>
      )}

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "14px", padding: "1.6rem", boxShadow: "0 3px 16px rgba(0,0,0,0.08)" }}>
        {node?.result ? (
          (() => {
            const tc = typeConfig[node.type];
            return (
              <div>
                <div style={{ background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: "8px", padding: "0.6rem 0.9rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.95rem" }}>{tc.icon}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: tc.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tc.label}</span>
                </div>
                <h3 style={{ fontFamily: "'Lora', serif", color: "#162e45", fontSize: "1.15rem", marginTop: 0, marginBottom: "0.7rem" }}>{node.title}</h3>
                <p style={{ color: "#444", lineHeight: 1.75, fontSize: "0.93rem", marginBottom: "1.25rem" }}>{node.message}</p>
                {node.action && (
                  <div style={{ background: "#f0f5fa", border: "1px solid #c8dced", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#162e45", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>📧</span>
                    <span>{node.action}</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  <button onClick={restart} style={{ background: active.color, color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.15rem", cursor: "pointer", fontSize: "0.88rem", fontWeight: 500 }}>
                    Start over
                  </button>
                  {history.length > 0 && (
                    <button onClick={back} style={{ background: "none", border: `1.5px solid ${active.color}`, color: active.color, borderRadius: "8px", padding: "0.6rem 1.15rem", cursor: "pointer", fontSize: "0.88rem", fontWeight: 500 }}>
                      ← Go back
                    </button>
                  )}
                </div>
              </div>
            );
          })()
        ) : (
          <div>
            <p style={{ fontFamily: "'Lora', serif", color: "#162e45", fontSize: "1.05rem", fontWeight: 600, marginTop: 0, marginBottom: "1.1rem", lineHeight: 1.6 }}>
              {node?.question}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {node?.options.map((opt, i) => (
                <button
                  key={i}
                  className="opt-btn"
                  onClick={() => choose(opt.next)}
                  style={{
                    "--hover-color": active.color,
                    "--hover-bg": `${active.color}0d`,
                    background: "#f9f7f4",
                    border: "1.5px solid #e0dbd0",
                    borderRadius: "9px",
                    padding: "0.8rem 1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#333",
                    fontSize: "0.91rem",
                    lineHeight: 1.5,
                    transition: "border-color 0.12s, background 0.12s",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {history.length > 0 && (
              <button onClick={back} style={{ marginTop: "1.1rem", background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "0.82rem", padding: 0 }}>
                ← Previous question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )}
</div>

);
}
