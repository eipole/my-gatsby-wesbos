const nodemailer = require("nodemailer")

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your order for ${total} is ready</h2>
    <p>Get it now</p>
    <ul>
    ${order.map(
      (elem) =>
        `<li>
      <img src="${elem.thumbnail}" alt="som pizza" />
      ${elem.size} ${elem.name} - ${elem.price}
      </li>`
    )}
    </ul>
    <p>Your ordre total is $${total}-pick it up </p>
    </div>`
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
})

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

exports.handler = async (event, context) => {
  // await wait(3000)
  const body = JSON.parse(event.body)
  // honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Fuck off ..... fuck off.... fuc" }),
    }
  }

  const requiredFields = ["email", "name", "order"]
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You are missing the ${field} ok? `,
        }),
      }
    }
  }
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `You must order somthing` }),
    }
  }
  const info = await transporter.sendMail({
    from: "Slicsen slacsen <slicsen@example.com> ",
    to: `${body.name} <${body.email}>, orders@example.com  `,
    subject: "Midagi uut",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  })
  console.log(info)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  }
}
