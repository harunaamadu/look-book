import { APP_URL } from "@/lib/resend";

// ─── Shared styles ─────────────────────────────────────────
const styles = {
  body: `font-family: 'Georgia', serif; background: #fafaf8; margin: 0; padding: 0;`,
  container: `max-width: 560px; margin: 40px auto; background: #ffffff; border: 1px solid #e8e6e0;`,
  header: `background: #1a1a18; padding: 32px 48px;`,
  logo: `color: #fafaf8; font-size: 20px; letter-spacing: 0.3em; text-transform: uppercase; font-family: Georgia, serif; text-decoration: none;`,
  body_content: `padding: 48px;`,
  eyebrow: `font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #8a8a7a; margin: 0 0 16px;`,
  heading: `font-size: 28px; font-weight: 300; color: #1a1a18; margin: 0 0 16px; line-height: 1.3; font-family: Georgia, serif;`,
  body_text: `font-size: 14px; color: #6a6a5a; line-height: 1.7; margin: 0 0 24px;`,
  button: `display: inline-block; background: #1a1a18; color: #fafaf8; padding: 14px 32px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; font-family: Georgia, serif;`,
  divider: `border: none; border-top: 1px solid #e8e6e0; margin: 32px 0;`,
  footer: `padding: 24px 48px; background: #f5f4f0; text-align: center;`,
  footer_text: `font-size: 11px; color: #8a8a7a; line-height: 1.6; margin: 0;`,
  link: `color: #1a1a18; text-decoration: underline;`,
};

// ─── Base layout ──────────────────────────────────────────
function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#fafaf8" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#fafaf8" }}>
          <tr>
            <td align="center" style={{ padding: "40px 16px" }}>
              <table width="560" cellPadding={0} cellSpacing={0} style={{ maxWidth: "560px", width: "100%", backgroundColor: "#ffffff", border: "1px solid #e8e6e0" }}>
                {/* Header */}
                <tr>
                  <td style={{ backgroundColor: "#1a1a18", padding: "32px 48px" }}>
                    <a href={APP_URL} style={{ color: "#fafaf8", fontSize: "18px", letterSpacing: "0.3em", textTransform: "uppercase" as const, fontFamily: "Georgia, serif", textDecoration: "none" }}>
                      LOOK
                    </a>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td style={{ padding: "48px" }}>
                    {children}
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: "24px 48px", backgroundColor: "#f5f4f0", textAlign: "center" as const }}>
                    <p style={{ fontSize: "11px", color: "#8a8a7a", lineHeight: "1.6", margin: "0 0 8px" }}>
                      You received this email because you have an account with LOOK.
                    </p>
                    <p style={{ fontSize: "11px", color: "#8a8a7a", margin: 0 }}>
                      © {new Date().getFullYear()} LOOK. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

// ─── Password reset email ─────────────────────────────────
export function PasswordResetEmail({ resetUrl, name }: { resetUrl: string; name?: string }) {
  return (
    <EmailLayout>
      <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#8a8a7a", margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
        Password Reset
      </p>
      <h1 style={{ fontSize: "26px", fontWeight: 300, color: "#1a1a18", margin: "0 0 20px", lineHeight: "1.3", fontFamily: "Georgia, serif" }}>
        Reset your password
      </h1>
      <p style={{ fontSize: "14px", color: "#6a6a5a", lineHeight: "1.7", margin: "0 0 8px" }}>
        Hi{name ? ` ${name}` : ""}, we received a request to reset the password for your LOOK account.
      </p>
      <p style={{ fontSize: "14px", color: "#6a6a5a", lineHeight: "1.7", margin: "0 0 32px" }}>
        Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.
      </p>

      <table cellPadding={0} cellSpacing={0} style={{ marginBottom: "32px" }}>
        <tr>
          <td>
            <a href={resetUrl} style={{ display: "inline-block", backgroundColor: "#1a1a18", color: "#fafaf8", padding: "14px 32px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, textDecoration: "none", fontFamily: "Georgia, serif" }}>
              Reset Password
            </a>
          </td>
        </tr>
      </table>

      <hr style={{ border: "none", borderTop: "1px solid #e8e6e0", margin: "0 0 24px" }} />

      <p style={{ fontSize: "12px", color: "#8a8a7a", lineHeight: "1.6", margin: "0 0 8px" }}>
        If the button doesn&apos;t work, copy and paste this link into your browser:
      </p>
      <p style={{ fontSize: "12px", color: "#1a1a18", wordBreak: "break-all" as const, margin: "0 0 24px" }}>
        <a href={resetUrl} style={{ color: "#1a1a18" }}>{resetUrl}</a>
      </p>
      <p style={{ fontSize: "12px", color: "#8a8a7a", lineHeight: "1.6", margin: 0 }}>
        If you didn&apos;t request a password reset, you can safely ignore this email.
        Your password will not be changed.
      </p>
    </EmailLayout>
  );
}

// ─── Email verification email ─────────────────────────────
export function VerifyEmailTemplate({ verifyUrl, name }: { verifyUrl: string; name?: string }) {
  return (
    <EmailLayout>
      <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#8a8a7a", margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
        Welcome to LOOK
      </p>
      <h1 style={{ fontSize: "26px", fontWeight: 300, color: "#1a1a18", margin: "0 0 20px", lineHeight: "1.3", fontFamily: "Georgia, serif" }}>
        Verify your email
      </h1>
      <p style={{ fontSize: "14px", color: "#6a6a5a", lineHeight: "1.7", margin: "0 0 8px" }}>
        Hi{name ? ` ${name}` : ""}, welcome to LOOK! We&apos;re excited to have you.
      </p>
      <p style={{ fontSize: "14px", color: "#6a6a5a", lineHeight: "1.7", margin: "0 0 32px" }}>
        Please verify your email address to activate your account and start shopping.
        This link expires in <strong>24 hours</strong>.
      </p>

      <table cellPadding={0} cellSpacing={0} style={{ marginBottom: "32px" }}>
        <tr>
          <td>
            <a href={verifyUrl} style={{ display: "inline-block", backgroundColor: "#1a1a18", color: "#fafaf8", padding: "14px 32px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, textDecoration: "none", fontFamily: "Georgia, serif" }}>
              Verify Email Address
            </a>
          </td>
        </tr>
      </table>

      <hr style={{ border: "none", borderTop: "1px solid #e8e6e0", margin: "0 0 24px" }} />

      <p style={{ fontSize: "12px", color: "#8a8a7a", lineHeight: "1.6", margin: "0 0 8px" }}>
        If the button doesn&apos;t work, copy and paste this link into your browser:
      </p>
      <p style={{ fontSize: "12px", color: "#1a1a18", wordBreak: "break-all" as const, margin: "0 0 24px" }}>
        <a href={verifyUrl} style={{ color: "#1a1a18" }}>{verifyUrl}</a>
      </p>
      <p style={{ fontSize: "12px", color: "#8a8a7a", margin: 0 }}>
        If you didn&apos;t create a LOOK account, you can safely ignore this email.
      </p>
    </EmailLayout>
  );
}

// ─── Welcome email (sent after verification) ──────────────
export function WelcomeEmail({ name }: { name?: string }) {
  return (
    <EmailLayout>
      <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#8a8a7a", margin: "0 0 20px", fontFamily: "Georgia, serif" }}>
        You&apos;re in
      </p>
      <h1 style={{ fontSize: "26px", fontWeight: 300, color: "#1a1a18", margin: "0 0 20px", lineHeight: "1.3", fontFamily: "Georgia, serif" }}>
        Welcome to LOOK{name ? `, ${name}` : ""}
      </h1>
      <p style={{ fontSize: "14px", color: "#6a6a5a", lineHeight: "1.7", margin: "0 0 32px" }}>
        Your account is verified and ready. Explore our latest collections and discover
        pieces curated for the modern wardrobe.
      </p>

      <table cellPadding={0} cellSpacing={0} style={{ marginBottom: "32px" }}>
        <tr>
          <td>
            <a href={`${APP_URL}/products`} style={{ display: "inline-block", backgroundColor: "#1a1a18", color: "#fafaf8", padding: "14px 32px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, textDecoration: "none", fontFamily: "Georgia, serif" }}>
              Start Shopping
            </a>
          </td>
        </tr>
      </table>

      <hr style={{ border: "none", borderTop: "1px solid #e8e6e0", margin: "0 0 24px" }} />

      <table width="100%" cellPadding={0} cellSpacing={0}>
        {[
          { label: "Free Returns", desc: "On all orders within 30 days" },
          { label: "New Arrivals", desc: "Fresh pieces added every week" },
          { label: "Members Pricing", desc: "Exclusive discounts for members" },
        ].map((item) => (
          <tr key={item.label}>
            <td style={{ paddingBottom: "12px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a18", margin: "0 0 2px", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>
                {item.label}
              </p>
              <p style={{ fontSize: "12px", color: "#8a8a7a", margin: 0 }}>
                {item.desc}
              </p>
            </td>
          </tr>
        ))}
      </table>
    </EmailLayout>
  );
}