import { useState } from “react”;

const scenarios = [
{
id: “enrollment”,
icon: “📋”,
title: “Enrollment & Credits”,
subtitle: “Am I taking the right number of credits?”,
color: “#1a4a6b”,
tree: {
question: “What semester is it right now?”,
options: [
{ label: “Fall or Spring (regular semester)”, next: “fall_spring_enrolled” },
{ label: “Summer”, next: “summer” },
],
},
nodes: {
fall_spring_enrolled: {
question: “Are you currently enrolled in classes?”,
options: [
{ label: “Yes”, next: “fall_spring_credits” },
{ label: “No — I withdrew from all classes”, next: “not_enrolled” },
],
},
fall_spring_credits: {
question: “How many total credits are you registered for?”,
options: [
{ label: “12 or more”, next: “check_online” },
{ label: “Less than 12”, next: “under_12” },
],
},
check_online: {
question: “How many of those credits are online (distance education)?”,
options: [
{ label: “3 or fewer”, next: “good_standing” },
{ label: “More than 3”, next: “too_many_online” },
],
},
good_standing: {
result: true, type: “ok”,
title: “You’re in good shape!”,
message: “You meet the full-time enrollment requirement for F-1 status. You have 12+ credits and no more than 3 online. Keep it up — and let your advisor know before you make any schedule changes.”,
},
too_many_online: {
result: true, type: “urgent”,
title: “Too many online credits”,
message: “F-1 students can only count up to 3 online credits toward the full-time requirement. You need to swap one online class for an in-person class. Contact your advisor right away — this needs to be fixed before the semester deadline.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
under_12: {
question: “Do you have an approved Reduced Course Load (RCL) on file with your advisor?”,
options: [
{ label: “Yes, my advisor approved it in writing”, next: “rcl_approved” },
{ label: “No”, next: “need_rcl” },
],
},
rcl_approved: {
result: true, type: “ok”,
title: “You’re covered — for now”,
message: “If your RCL is officially documented and approved by your DSO in SEVIS, you’re okay for this semester. Make sure you have written confirmation. If you’re not 100% sure, ask.”,
},
need_rcl: {
result: true, type: “urgent”,
title: “Contact your advisor today”,
message: “Taking fewer than 12 credits without an approved RCL puts your F-1 status at risk. You need to either add credits to reach 12, or get an RCL authorized immediately. Don’t wait on this one.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
not_enrolled: {
result: true, type: “urgent”,
title: “This is urgent — contact your advisor now”,
message: “F-1 students must be enrolled full-time during fall and spring semesters. If you withdrew from all classes, your status may already be at risk. Contact your advisor today — not tomorrow.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
summer: {
result: true, type: “ok”,
title: “Summer is usually optional”,
message: “Most F-1 students are not required to enroll in summer. As long as you were full-time in spring and plan to be full-time in fall, you’re fine to take the summer off. That said, if this is your final semester or you have CPT, different rules may apply. When in doubt, ask.”,
},
},
},
{
id: “opt”,
icon: “💼”,
title: “OPT”,
subtitle: “Work authorization after graduation”,
color: “#2d6a4f”,
tree: {
question: “Where are you in your program?”,
options: [
{ label: “Still enrolled, haven’t graduated yet”, next: “pre_completion” },
{ label: “Graduating within the next 90 days”, next: “about_to_graduate” },
{ label: “Already graduated”, next: “post_grad” },
],
},
nodes: {
pre_completion: {
question: “Have you completed at least one full academic year at NOVA?”,
options: [
{ label: “Yes”, next: “pre_opt_eligible” },
{ label: “No”, next: “not_eligible_yet” },
],
},
pre_opt_eligible: {
result: true, type: “info”,
title: “You may be eligible for pre-completion OPT”,
message: “Pre-completion OPT lets you work part-time (up to 20 hrs/week) while still enrolled. Keep in mind: it uses up part of your 12-month OPT authorization, so think carefully before applying. Talk to your advisor about whether this makes sense for your situation.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
not_eligible_yet: {
result: true, type: “info”,
title: “Not yet — but you’re getting there”,
message: “You need to complete one full academic year (two semesters) at NOVA before you can apply for OPT. Keep working toward that and come talk to your advisor when you’re getting close to the one-year mark.”,
},
about_to_graduate: {
result: true, type: “urgent”,
title: “Apply now — timing is everything with OPT”,
message: “You can apply up to 90 days before your graduation date, and no later than 60 days after. USCIS processing can take 3 to 5 months, so the earlier the better. You need a new I-20 with an OPT recommendation from your DSO before you file. Do not start working until you have your EAD card in hand.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
post_grad: {
question: “What is your OPT status right now?”,
options: [
{ label: “I applied and I’m waiting for my EAD”, next: “waiting_ead” },
{ label: “I haven’t applied yet”, next: “post_grad_apply” },
{ label: “I have my EAD”, next: “have_ead” },
],
},
waiting_ead: {
result: true, type: “ok”,
title: “Hang tight — and track your unemployment days”,
message: “You’re in your 60-day grace period after graduation. Once your OPT start date begins, you have a total of 90 unemployment days you can use during your OPT period. Keep track — they count even while you’re waiting on job applications.”,
},
post_grad_apply: {
question: “How long ago did you graduate?”,
options: [
{ label: “Less than 60 days ago”, next: “still_can_apply” },
{ label: “More than 60 days ago”, next: “too_late” },
],
},
still_can_apply: {
result: true, type: “urgent”,
title: “Apply now — don’t wait another day”,
message: “You still have time, but the window is closing fast. Contact your advisor today to get your OPT I-20. Then submit your USCIS application right away.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
too_late: {
result: true, type: “urgent”,
title: “Contact your advisor immediately”,
message: “The OPT application window has likely closed. This is a serious situation. Contact your advisor today to talk through your options, which may include a school transfer or preparing to depart the US.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
have_ead: {
result: true, type: “ok”,
title: “You’re authorized to work!”,
message: “You can work in your field — make sure the job is related to your degree. Remember: you have 90 total unemployment days during your OPT period. Report any address or employer changes to your DSO within 10 days.”,
},
},
},
{
id: “cpt”,
icon: “🎓”,
title: “CPT”,
subtitle: “Work while you’re still enrolled”,
color: “#6b3a1a”,
tree: {
question: “Do you have a job or internship offer?”,
options: [
{ label: “Yes, I have an offer”, next: “have_offer” },
{ label: “No, just exploring my options”, next: “exploring” },
],
},
nodes: {
have_offer: {
question: “Is the internship or job directly related to your major?”,
options: [
{ label: “Yes, it’s in my field”, next: “check_year” },
{ label: “Probably not”, next: “not_related” },
{ label: “Not sure”, next: “check_with_advisor” },
],
},
check_year: {
question: “Have you completed at least one full academic year at NOVA?”,
options: [
{ label: “Yes”, next: “check_curriculum” },
{ label: “No”, next: “need_year” },
],
},
check_curriculum: {
question: “Is this internship a required or listed elective part of your degree program?”,
options: [
{ label: “Yes, it’s in my degree requirements”, next: “cpt_eligible” },
{ label: “I’m not sure”, next: “check_with_advisor” },
{ label: “No, it’s a separate opportunity”, next: “not_eligible” },
],
},
cpt_eligible: {
result: true, type: “ok”,
title: “You may be eligible for CPT”,
message: “Good news. Contact your advisor to start the process. You will need documentation from your employer and your academic department. CPT must be authorized on your I-20 before your first day of work — never start without it.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
check_with_advisor: {
result: true, type: “info”,
title: “Talk to your advisor first”,
message: “CPT eligibility depends on specifics that your advisor needs to review. Bring your job offer letter and your degree plan to the appointment. Don’t accept the offer or start work until you have CPT authorization on your I-20.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
not_related: {
result: true, type: “warning”,
title: “CPT must be tied to your major”,
message: “CPT is only for work that is an integral part of your academic program. If the job isn’t in your field, it likely won’t qualify. Talk to your advisor before you turn down the offer — there may be more to consider.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
need_year: {
result: true, type: “warning”,
title: “Not yet — you need one full academic year first”,
message: “F-1 students generally need to complete one full academic year before CPT is available. Keep this in mind when planning internship timelines.”,
},
not_eligible: {
result: true, type: “warning”,
title: “CPT probably isn’t the right fit here”,
message: “For CPT to work, the internship has to be a required or elective part of your degree, you have to be enrolled full-time, and the program needs to be listed in the catalog as including practical training. If this doesn’t match, talk to your advisor — they may know other options.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
exploring: {
result: true, type: “info”,
title: “Here’s the short version on CPT”,
message: “CPT lets you work off-campus in a job related to your major while you’re still enrolled. Key requirements: one full academic year completed, enrolled full-time, the internship is part of your curriculum, and your advisor authorizes it on your I-20 before you start. Talk to your academic advisor and DSO before you apply for internships.”,
},
},
},
{
id: “travel”,
icon: “✈️”,
title: “Travel”,
subtitle: “Leaving and returning to the US”,
color: “#4a1a6b”,
tree: {
question: “Where are you right now?”,
options: [
{ label: “I’m in the US and planning to travel”, next: “planning_travel” },
{ label: “I’m outside the US and trying to return”, next: “returning” },
],
},
nodes: {
planning_travel: {
question: “Is your I-20 travel signature current? (Must be signed within the last 12 months — or 6 months if you’re on OPT)”,
options: [
{ label: “Yes, the signature is current”, next: “check_visa” },
{ label: “No, or I’m not sure”, next: “need_signature” },
],
},
check_visa: {
question: “Is your F-1 visa still valid (not expired)?”,
options: [
{ label: “Yes, still valid”, next: “ready_to_travel” },
{ label: “No, it’s expired”, next: “expired_visa” },
],
},
ready_to_travel: {
result: true, type: “ok”,
title: “You should be good to go”,
message: “Make sure you travel with: your valid passport, your valid F-1 visa, your current I-20 with a current travel signature, and your enrollment verification or offer letter in case you’re asked at the border. Have a safe trip!”,
},
expired_visa: {
result: true, type: “warning”,
title: “You’ll need a new visa before you return”,
message: “Your F-1 visa only matters at the port of entry — it gets you back into the US. If it’s expired, you’ll need to apply for a new one at a US consulate before you come back. Plan extra time for that. Canadian citizens are typically an exception. Talk to your advisor before you leave.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
need_signature: {
result: true, type: “warning”,
title: “Get your travel signature updated first”,
message: “Contact your DSO to get a new travel signature on your I-20. Without a current signature, you may have trouble re-entering the US. This is quick to fix — just give your advisor a heads up before your trip.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
returning: {
question: “Do you have all three of these: valid passport, valid F-1 visa, and a current I-20 travel signature?”,
options: [
{ label: “Yes, all three are good”, next: “returning_ok” },
{ label: “My visa is expired”, next: “returning_expired_visa” },
{ label: “My I-20 travel signature is outdated”, next: “returning_old_signature” },
{ label: “Something else is missing”, next: “returning_contact” },
],
},
returning_ok: {
result: true, type: “ok”,
title: “You’re set to return”,
message: “You have everything you need. At the port of entry, be ready to show your I-20, passport, and visa. Answer questions calmly and honestly. Welcome back!”,
},
returning_expired_visa: {
result: true, type: “urgent”,
title: “Renew your visa before trying to enter the US”,
message: “An expired F-1 visa means you cannot re-enter the US until you get a new one from a US consulate. Contact your advisor for a support letter and guidance on the visa appointment process.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
returning_old_signature: {
result: true, type: “urgent”,
title: “Contact your advisor before trying to re-enter”,
message: “You may be denied entry without a current I-20 travel signature. Contact your DSO and ask for an updated I-20 — they can send it electronically. Do not attempt to re-enter with an outdated signature.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
returning_contact: {
result: true, type: “urgent”,
title: “Reach out to your advisor right away”,
message: “Something is missing and it’s important to get it sorted before you travel. Contact your DSO now and explain your situation in detail.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
},
},
{
id: “rcl”,
icon: “📉”,
title: “Reduced Course Load”,
subtitle: “Can I take fewer than 12 credits?”,
color: “#1a5f6b”,
tree: {
question: “Why do you need to take fewer than 12 credits?”,
options: [
{ label: “Medical reason (physical or mental health)”, next: “medical” },
{ label: “Academic difficulty in my first semester, or I was placed in the wrong course level”, next: “academic” },
{ label: “Final semester — I only need a few credits to finish”, next: “final_semester” },
{ label: “Another reason (work, finances, personal)”, next: “other” },
],
},
nodes: {
medical: {
result: true, type: “info”,
title: “Medical RCL is possible — but you need documentation”,
message: “You can get a medical RCL with a letter from a licensed doctor or counselor recommending reduced enrollment. This cannot be self-diagnosed or self-reported. Bring the letter to your DSO — they will authorize the RCL in SEVIS. This is available for up to 12 months of your program.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
academic: {
result: true, type: “info”,
title: “Academic RCL — available, but limited”,
message: “Academic difficulty RCL is only available once per program, and only in your first semester or if you were placed at the wrong course level. It is not something you can use every semester. Talk to your advisor to confirm you qualify.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
final_semester: {
result: true, type: “ok”,
title: “Final semester exception may apply”,
message: “If you only need a few credits to complete your program, you may qualify for a final semester exception — even if those credits put you below full-time. Talk to your DSO to confirm and make sure it is documented on your I-20.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
other: {
result: true, type: “urgent”,
title: “This one’s a hard no — talk to your advisor first”,
message: “Work, finances, and personal reasons do not qualify for an RCL under F-1 rules. Taking fewer than 12 credits without an approved RCL is an enrollment violation. Do not drop classes without talking to your DSO first. The only valid reasons are medical, academic difficulty in your first semester, or final semester.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
},
},
{
id: “extension”,
icon: “📅”,
title: “Program Extension”,
subtitle: “My program end date is coming up”,
color: “#5a6b1a”,
tree: {
question: “When is your I-20 program end date?”,
options: [
{ label: “More than 3 months away”, next: “not_urgent” },
{ label: “Within the next 1 to 3 months”, next: “getting_close” },
{ label: “It has already passed”, next: “already_passed” },
],
},
nodes: {
not_urgent: {
result: true, type: “ok”,
title: “No rush — but keep it on your radar”,
message: “You have time, but don’t wait until the last minute. If you know you’ll need more time to finish, start the conversation with your advisor at least 60 days before your end date. Extensions require documentation and a clear reason.”,
},
getting_close: {
question: “Will you finish your program by the current end date on your I-20?”,
options: [
{ label: “Yes, I’ll finish on time”, next: “finish_on_time” },
{ label: “No, I need more time”, next: “need_extension” },
],
},
finish_on_time: {
result: true, type: “ok”,
title: “You’re on track”,
message: “As long as you finish by your I-20 program end date, you’re fine. After you complete your program, you have a 60-day grace period. Use that time to prepare for departure, transfer to another school, or apply for OPT if eligible.”,
},
need_extension: {
result: true, type: “urgent”,
title: “Request an extension now — before it’s too late”,
message: “Extensions must be requested before your program end date, not after. You will need documentation showing why you need more time — usually a letter from your academic advisor confirming remaining coursework. Contact your DSO today.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
already_passed: {
result: true, type: “urgent”,
title: “This is serious — contact your advisor today”,
message: “If your program end date has passed without an extension, you may already be out of status. Do not ignore this. Contact your DSO immediately to go over your options, which may include reinstatement.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
},
},
{
id: “sevis”,
icon: “⚠️”,
title: “SEVIS Termination”,
subtitle: “My status was terminated — what do I do?”,
color: “#6b1a1a”,
tree: {
question: “Do you know why your SEVIS record was terminated?”,
options: [
{ label: “Enrollment violation (dropped below full-time, too many online credits)”, next: “enrollment_term” },
{ label: “Failure to report (address, etc.)”, next: “reporting_term” },
{ label: “I’m not sure why”, next: “not_sure” },
{ label: “I think it was a mistake”, next: “possible_error” },
],
},
nodes: {
enrollment_term: {
result: true, type: “urgent”,
title: “You need to act — and quickly”,
message: “Termination for an enrollment violation is serious. You are out of status right now. You have two main paths: reinstatement (a USCIS application that takes several months), or departing the US and re-entering on a new SEVIS record if your school can issue one. Do not stay in the US without a clear plan. Contact your advisor today.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
reporting_term: {
result: true, type: “urgent”,
title: “Contact your advisor right away”,
message: “Failure to report (like not updating your address within 10 days) can lead to termination. Depending on the circumstances, your advisor may be able to help correct the record, or you may need to reinstate. Either way, this needs immediate attention.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
not_sure: {
result: true, type: “urgent”,
title: “Find out before you do anything else”,
message: “The reason for termination determines your options. Contact your DSO immediately. Do not travel outside the US while your SEVIS record is terminated — re-entry would be denied.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
possible_error: {
result: true, type: “urgent”,
title: “Still urgent — even if it’s a mistake”,
message: “Even a mistaken termination has to be corrected through official channels. Your DSO may be able to reinstate your SEVIS record with a notation. This is not something you can fix on your own. Contact your advisor today and bring any documentation that supports the error.”,
action: “Email your DSO: dhu@nvcc.edu”,
},
},
},
{
id: "transfer",
icon: "🔄",
title: "Transfer Out",
subtitle: "Transferring to another school",
color: "#1a4a5a",
tree: {
question: "What is your current enrollment status at NOVA?",
options: [
{ label: "Still enrolled this semester", next: "still_enrolled" },
{ label: "I've already completed my program or stopped attending", next: "completed_or_left" },
],
},
nodes: {
still_enrolled: {
question: "Have you already been accepted to the new school?",
options: [
{ label: "Yes, I have an acceptance letter", next: "accepted" },
{ label: "No, still applying", next: "still_applying" },
],
},
accepted: {
question: "When do you plan to start at the new school?",
options: [
{ label: "Within the next 60 days", next: "transfer_soon" },
{ label: "More than 60 days from now", next: "transfer_later" },
],
},
transfer_soon: {
result: true, type: "urgent",
title: "Start the transfer process now",
message: "Your current DSO must release your SEVIS record to your new school before they can issue you a new I-20. Contact your advisor at NOVA right away to initiate the transfer. You must request the transfer before your NOVA program end date. Do not enroll at the new school before getting a new I-20.",
action: "Email your DSO: dhu@nvcc.edu",
},
transfer_later: {
result: true, type: "info",
title: "Good — you have time, but don't wait too long",
message: "You'll need to request your SEVIS transfer from NOVA's DSO, and the new school will issue you a new I-20. Start this process at least 30 days before your intended transfer date. The transfer must happen before your NOVA program end date. Also confirm with the new school what they need from you.",
action: "Email your DSO: dhu@nvcc.edu",
},
still_applying: {
result: true, type: "info",
title: "Nothing to do on the SEVIS side yet — but plan ahead",
message: "You can't initiate a SEVIS transfer until you have an acceptance from the new school. Keep working toward your application. Once accepted, come see your DSO promptly — transfers have timing rules tied to your current program end date.",
},
completed_or_left: {
question: "Are you still within your 60-day grace period after program completion?",
options: [
{ label: "Yes, within 60 days", next: "grace_period" },
{ label: "No, more than 60 days have passed", next: "past_grace" },
],
},
grace_period: {
result: true, type: "urgent",
title: "Act before your grace period ends",
message: "You have a 60-day grace period after completing your program to transfer, depart, or apply for OPT. If you want to transfer, contact your DSO and request the SEVIS transfer before that window closes. This is time-sensitive.",
action: "Email your DSO: dhu@nvcc.edu",
},
past_grace: {
result: true, type: "urgent",
title: "This is a serious situation — contact your advisor immediately",
message: "If your grace period has passed and you haven't transferred or departed, your status may be at risk. Do not ignore this. Contact your DSO today to understand your options, which may include reinstatement or departure.",
action: "Email your DSO: dhu@nvcc.edu",
},
},
},
{
id: "oncampus",
icon: "🏫",
title: "On-Campus Work",
subtitle: "Can I work on campus?",
color: "#3a1a6b",
tree: {
question: "Are you currently enrolled full-time at NOVA?",
options: [
{ label: "Yes, full-time (12+ credits)", next: "fulltime" },
{ label: "No, part-time or not enrolled", next: "not_fulltime" },
],
},
nodes: {
fulltime: {
question: "Where would you be working?",
options: [
{ label: "On NOVA's campus (library, bookstore, department, etc.)", next: "on_nova_campus" },
{ label: "At a business on campus that serves students (contracted vendor)", next: "contractor" },
{ label: "Off-campus", next: "off_campus" },
],
},
on_nova_campus: {
result: true, type: "ok",
title: "On-campus work is allowed — up to 20 hours per week",
message: "F-1 students can work on campus without special authorization as long as you are enrolled full-time. You may work up to 20 hours per week while school is in session. During official school breaks (summer, winter), you may work full-time if you are registered for the next semester. Your I-20 and visa are sufficient — no separate work authorization document is needed.",
},
contractor: {
result: true, type: "info",
title: "It depends — check with your advisor",
message: "Work for a business that contracts with the school is allowed only if it directly provides services to students on campus. The rules here can be narrow. Confirm with your DSO before you accept the job.",
action: "Email your DSO: dhu@nvcc.edu",
},
off_campus: {
question: "Do you have CPT, OPT, or other USCIS work authorization?",
options: [
{ label: "Yes, I have CPT or OPT authorization", next: "authorized_offcampus" },
{ label: "No authorization", next: "no_auth" },
],
},
authorized_offcampus: {
result: true, type: "ok",
title: "You can work — within your authorization limits",
message: "As long as you have a valid CPT or OPT authorization on your I-20 or EAD, you're good to work off-campus within those terms. Make sure the job matches your authorized field of study, and don't exceed your authorized hours.",
},
no_auth: {
result: true, type: "urgent",
title: "Do not work off-campus without authorization",
message: "Unauthorized off-campus employment is a serious F-1 violation and can result in termination of your SEVIS record. The only exception without separate authorization is severe economic hardship — and that still requires USCIS approval. Talk to your advisor before taking any off-campus job.",
action: "Email your DSO: dhu@nvcc.edu",
},
not_fulltime: {
result: true, type: "warning",
title: "On-campus work requires full-time enrollment",
message: "F-1 students can only work on campus if they are maintaining full-time enrollment (12+ credits in fall/spring). If you are part-time due to an approved RCL, confirm with your DSO whether on-campus work is still permitted in your specific situation.",
action: "Email your DSO: dhu@nvcc.edu",
},
},
},

];

const typeConfig = {
ok: { icon: “✅”, label: “You’re good”, color: “#1a6b3a”, bg: “#f0faf4”, border: “#86efac” },
warning: { icon: “⚠️”, label: “Heads up”, color: “#7a5c00”, bg: “#fffbea”, border: “#fcd34d” },
urgent: { icon: “🚨”, label: “Action needed”, color: “#7a1a1a”, bg: “#fff5f5”, border: “#fca5a5” },
info: { icon: “ℹ️”, label: “Good to know”, color: “#1a3a7a”, bg: “#f0f5ff”, border: “#93c5fd” },
};

export default function F1Navigator() {
const [active, setActive] = useState(null);
const [history, setHistory] = useState([]);
const [nodeId, setNodeId] = useState(“start”);

const open = (s) => { setActive(s); setHistory([]); setNodeId(“start”); };
const close = () => { setActive(null); setHistory([]); setNodeId(“start”); };

const getNode = (s, id) => id === “start” ? s.tree : s.nodes[id];

const choose = (next) => {
setHistory(h => [...h, nodeId]);
setNodeId(next);
};

const back = () => {
if (!history.length) return;
setNodeId(history[history.length - 1]);
setHistory(h => h.slice(0, -1));
};

const restart = () => { setHistory([]); setNodeId(“start”); };

const node = active ? getNode(active, nodeId) : null;

return (
<div style={{ fontFamily: “‘DM Sans’, ‘Segoe UI’, sans-serif”, minHeight: “100vh”, background: “#f4f1ec” }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap'); * { box-sizing: border-box; } .card-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.12) !important; } .opt-btn:hover { border-color: var(--hover-color) !important; background: var(--hover-bg) !important; } .back-link:hover { opacity: 0.7; }`}</style>

```
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
              padding: "1.4rem",
              textAlign: "left",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              borderTop: `4px solid ${s.color}`,
            }}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, color: s.color, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
              {s.title}
            </div>
            <div style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.4 }}>{s.subtitle}</div>
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

      {/* Scenario label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "1.75rem" }}>{active.icon}</span>
        <div>
          <div style={{ fontFamily: "'Lora', serif", color: active.color, fontWeight: 700, fontSize: "1.2rem" }}>{active.title}</div>
          <div style={{ color: "#888", fontSize: "0.82rem" }}>{active.subtitle}</div>
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
```

);
}
