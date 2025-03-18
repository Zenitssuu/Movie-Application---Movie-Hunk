import Booking from '../models/Booking.js';
import User from '../models/UserModel.js';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
});

const sendBookingConfirmationEmail = (email, bookingDetails) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Movie Ticket Booking Confirmation',
        html: `
            <h1>Booking Confirmation</h1>
            <p>Thank you for booking your movie ticket!</p>
            <p><strong>Movie:</strong> ${bookingDetails.movie}</p>
            <p><strong>Theater:</strong> ${bookingDetails.theater}</p>
            <p><strong>Date:</strong> ${bookingDetails.date}</p>
            <p><strong>Time:</strong> ${bookingDetails.time}</p>
            <p><strong>Seats:</strong> ${bookingDetails.seats.join(', ')}</p>
            <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount / 100}</p>
        `
    };
    return transporter.sendMail(mailOptions);
};

export const createBooking = async (req, res) => {
    const { theaterId, movieId, date, time, seats, userId, token } = req.body;

    try {
        // Create Stripe payment with return_url
        const paymentIntent = await stripe.paymentIntents.create({
            amount: seats.length * 10000, // Assuming ₹1000 per seat
            currency: 'INR',
            payment_method_data: {
                type: 'card',
                card: {
                    token: token
                }
            },
            confirm: true,
            return_url: 'https://your-website.com/payment-confirmation', // Update this to your actual return URL
        });

        // Save booking on successful payment
        const newBooking = new Booking({
            theater: theaterId,
            movie: movieId,
            date,
            time,
            bookedSeats: seats,
            user: userId,
            paymentStatus: 'completed',
            paymentId: paymentIntent.id,
        });

        await newBooking.save();

        // Fetch user details to send email
        const user = await User.findById(userId);

        if (user) {
            const bookingDetails = {
                movie: movieId,
                theater: theaterId,
                date,
                time,
                seats,
                totalAmount: seats.length * 1000,
            };
            await sendBookingConfirmationEmail(user.email, bookingDetails);
        }

        res.status(201).json({ message: 'Booking successful', booking: newBooking, ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment failed', error, ok: false });
    }
};

