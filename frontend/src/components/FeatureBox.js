import '../css/material-kit.css';

const FeatureBox = ({ imageLink, title, description }) => {
  return (
    <div class="col-md-4 position-relative">
        <div class="p-3 text-center">
            <div class="card move-on-hover">
                <img class="w-100" src={imageLink} />
            </div>
            <h5 class="mt-3">{title}</h5>
            <p class="mt-2 text-sm font-weight-normal">{description}</p>
        </div>
        <hr class="vertical dark" />
    </div>
  );
}

export default FeatureBox;
