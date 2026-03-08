import "server-only";
import { resend, FROM_EMAIL, APP_URL } from "@/lib/resend";
import { render } from "@react-email/render";
import { PasswordResetEmail, VerifyEmailTemplate, WelcomeEmail } from "@/lib/email-templates";

export async function sendPasswordResetEmailMessage({
  to,
  token,
  name,
}: {
  to: string;
  token: string;
  name?: string;
}) {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  const html = await render(<PasswordResetEmail resetUrl={resetUrl} name={name} />);

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Reset your LOOK password",
    html,
  });
}

export async function sendVerificationEmailMessage({
  to,
  token,
  name,
}: {
  to: string;
  token: string;
  name?: string;
}) {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  const html = await render(<VerifyEmailTemplate verifyUrl={verifyUrl} name={name} />);

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Verify your LOOK account",
    html,
  });
}

export async function sendWelcomeEmailMessage({
  to,
  name,
}: {
  to: string;
  name?: string;
}) {
  const html = await render(<WelcomeEmail name={name} />);

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Welcome to LOOK${name ? `, ${name}` : ""}`,
    html,
  });
}

export async function sendOrderNotificationEmail({
  to, orderId, customerName, total, itemCount,
}: {
  to: string; orderId: string; customerName: string;
  total: number; itemCount: number;
}) {
  const { resend } = await import("./resend");
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `New order — $${total.toFixed(2)} from ${customerName}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#1a1a18">
        <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#a8a29e;margin-bottom:32px">LOOK Admin</p>
        <h1 style="font-size:28px;font-weight:300;margin-bottom:8px">New order received</h1>
        <p style="color:#78716c;font-size:14px;margin-bottom:32px">A new order has been placed on LOOK.</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:32px">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a8a29e">Order ID</td><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;font-size:13px;text-align:right">#${orderId.slice(-8).toUpperCase()}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a8a29e">Customer</td><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;font-size:13px;text-align:right">${customerName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a8a29e">Items</td><td style="padding:10px 0;border-bottom:1px solid #e7e5e4;font-size:13px;text-align:right">${itemCount}</td></tr>
          <tr><td style="padding:10px 0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a8a29e">Total</td><td style="padding:10px 0;font-size:16px;font-weight:500;text-align:right">$${total.toFixed(2)}</td></tr>
        </table>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders/${orderId}" style="display:inline-block;background:#1a1a18;color:#fff;padding:14px 28px;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;text-decoration:none">View order</a>
      </div>
    `,
  });
}