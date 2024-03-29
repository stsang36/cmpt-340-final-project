import '../css/login.css';
import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function StaticFaqSection() {
  return (
    <div class="limiter" style={{ backgroundImage: `url('./assets/images/help-bg.webp')` }}>
        <span class="mask bg-gradient-primary opacity-4"></span>
        <MDBContainer class="container-login100" style={{ opacity: '0.95' }}>
        <section class="wrap-login100 p-l-55 p-r-55 p-t-50 p-b-54" style={{ width: '60%' }}>
            <MDBTypography
            tag="h3"
            className="text-center mb-4 pb-2 text-primary fw-bold"
            >
            FAQ
            </MDBTypography>
            <p className="text-center mb-5">
            Find the answers for the most frequently asked questions below
            </p>

            <MDBRow>
            <MDBCol md="6" lg="4" className="mb-4">
                <MDBTypography tag="h6" className="mb-3 text-primary">
                <MDBIcon far icon="paper-plane text-primary pe-2" /> What is TypeAid and how does it work?
                </MDBTypography>
                <p>
                TypeAid is an innovative assistive keyboard application designed to enhance typing accessibility. It features 8 core key clusters, simplifying the keyboard layout to make typing more accessible. When a user selects a core key, the cluster expands for precise input, complemented by our smart word prediction technology for seamless writing.
                </p>
            </MDBCol>
            <MDBCol md="6" lg="4" className="mb-4">
                <MDBTypography tag="h6" className="mb-3 text-primary">
                <MDBIcon fas icon="pen-alt text-primary pe-2" /> Who is TypeAid designed for?
                </MDBTypography>
                <p>
                TypeAid is designed for individuals who seek an easier, more accessible way to type on their devices. This includes users with motor difficulties, those who find traditional keyboards challenging, and anyone looking to streamline their typing process.
                </p>
            </MDBCol>
            <MDBCol md="6" lg="4" className="mb-4">
                <MDBTypography tag="h6" className="mb-3 text-primary">
                <MDBIcon fas icon="user text-primary pe-2" /> What makes TypeAid unique?
                </MDBTypography>
                <p>
                TypeAid sets itself apart with its unique 8 core key clusters, simplifying the keyboard layout to significantly reduce the effort required for typing. Our enhanced control feature and smart word prediction, powered by machine learning, further refine the user's typing experience, making it both efficient and accessible.
                </p>
            </MDBCol>
            <MDBCol md="6" lg="4" className="mb-4">
                <MDBTypography tag="h6" className="mb-3 text-primary">
                <MDBIcon fas icon="rocket text-primary pe-2" /> Can TypeAid predict words or phrases?
                </MDBTypography>
                <p>
                Absolutely, TypeAid’s smart word prediction is engineered with advanced machine learning to suggest words and phrases as you type, enhancing your writing speed and accuracy without compromising accessibility.
                </p>
            </MDBCol>
            <MDBCol md="6" lg="4" className="mb-4">
                <MDBTypography tag="h6" className="mb-3 text-primary">
                <MDBIcon fas icon="home text-primary pe-2" /> What languages does TypeAid support?
                </MDBTypography>
                <p>
                TypeAid only supports English at the moment, but we plan on including more languages in the near future, in order to make TypeAid a versatile keyboard application for a wide range of users worldwide.
                </p>
            </MDBCol>
            <MDBCol md="6" lg="4" className="mb-4">
                <MDBTypography tag="h6" className="mb-3 text-primary">
                <MDBIcon fas icon="book-open text-primary pe-2" /> Does TypeAid offer voice-to-text?
                </MDBTypography>
                <p>
                No, at the moment it does not, but, its in our list of TO-DO and we will be getting it implemented soon!
                </p>
            </MDBCol>
            </MDBRow>
        </section>
        </MDBContainer>
    </div>
  );
}