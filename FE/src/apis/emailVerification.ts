import emailjs from 'emailjs-com';

const emailVerification = (templateParams: { email: string; code: number }) => {
    return emailjs
        .send('service_ghi0l9o', 'template_n2gf4ee', templateParams, 'x7HcnhaxFzcRAc0tY')
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        })
        .catch((err) => {
            console.error('Failed to send email. Error:', err);
        });
};

export default emailVerification;
