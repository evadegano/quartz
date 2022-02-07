module.exports = {
  recoveryTemplate: (userId) => { 
    return (
      `<div>
        <p>Hi,
        <br/><br/>Someone has requested a new password for your Quartz account.
        <br/><br/>If you didn't make this request, just ignore this email. If you'd like to proceed:
        <br/><a href=${process.env.ORIGIN}/recovery/reset-password/${userId}>Click here to reset your password</a>
        <br/><br/>Thank you!
        </p>
      </div>`
    )
  }
}