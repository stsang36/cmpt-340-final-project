import './material-kit.css';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import FeatureBox from './components/FeatureBox';

const App = () => {
  return (
    <>
      <NavBar />
      <Header />

      <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
        <section class="pb-4" id="count-stats">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 mx-auto">
                <div class="row">
                  <div class="row text-center my-sm-5 mt-5">
                    <div class="col-lg-6 mx-auto">
                      <span class="badge bg-primary mb-3">Features</span>
                      <h2 class="">Your accessibility companion</h2>
                    </div>
                  </div>
                  <FeatureBox imageLink="./assets/images/core-keys.png" title="8 Core Keys" description="TypeAid enhances typing accessibility by offering only 8 key clusters, allowing users to precisely target their input" />
                  <FeatureBox imageLink="./assets/images/enhanced-control.png" title="Enhanced Control" description="Upon selecting a core key, the keys within the cluster expand, granting refined precision in selecting which keys to engage" />
                  <FeatureBox imageLink="./assets/images/smart-word-prediction.png" title="Smart Word Prediction" description="Crafted from masterfully engineered machine learning, our intelligent word prediction enhances writing seamlessly" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="bg-gradient-dark position-relative m-3 border-radius-xl overflow-hidden">
            <img src="./assets/images/shapes/waves-white.svg" alt="pattern-lines" class="position-absolute start-0 top-md-0 w-100 opacity-2" />
            <div class="container py-5 postion-relative z-index-2 position-relative">
              <div class="row">
                <div class="col-md-7 mx-auto text-center">
                  <h3 class="text-white mb-1">What are you waiting for?</h3>
                  <p class="text-white">Experience a refined and accessible typing and word processing journey with TypeAid</p>
                  <a href="#" class="btn btn-primary btn-lg mb-3 mb-sm-0">Join NOW</a>  
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default App;
