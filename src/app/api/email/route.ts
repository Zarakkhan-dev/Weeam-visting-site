import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zarakkhan1031@gmail.com",
    pass: "kdtn aphj vlha taso",
  },
});

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { Message: "Method Not Allowed" },
      { status: 401 }
    );
  }

  const { fullname, email, Message } = await request.json();

  if (!fullname || !email || !Message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 401 });
  }

  try {
    // Send to admin
    await transporter.sendMail({
      from: `"Website Contact Form" <zarakkhan1031@gmail.com}>`,
      to: "zarakkhan1031@gmail.com",
      subject: `New message from ${fullname}`,
      html: `
  <h2>New Contact Form Submission</h2>
  <p><strong>Full Name:</strong> ${fullname}</p>
  <p><strong>Email Address:</strong> ${email}</p>
  <p><strong>Message:</strong></p>
  <div style="background-color:#f9f9f9;padding:1rem;border-left:4px solid #0070f3;">
    <em>${Message}</em>
  </div>
  <p style="margin-top:20px;">Please follow up with this inquiry at your earliest convenience.</p>
`,
    });

    // Send thank-you to user
    await transporter.sendMail({
      from: `"Weeam" <zarakkhan1031@gmail.com>`,
      to: email,
      subject: "Thanks for contacting us!",
      html: `
  <p>Dear ${fullname},</p>

  <p>Thank you for reaching out to us. We have successfully received your message and one of our team members will be in touch with you shortly.</p>

  <h3>Your Message:</h3>
  <div style="background-color:#f1f1f1;padding:1rem;border-left:4px solid #28a745;">
    <em>${Message}</em>
  </div>

  <p>If you have any further questions or need immediate assistance, feel free to reply to this email.</p>

  <p>Best regards,<br />The Weeam Team</p>
`,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error sending email", err);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
