const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "21ff85513344fc5d5fc9d6c3709f1fe6-us1",
    server: "us1",
  });

async function run() {
    // const response = await mailchimp.ping.get();
    // console.log(response);

    const response = await mailchimp.lists.getList("b87d22b276");
    console.log(response);
  }
  
run();

