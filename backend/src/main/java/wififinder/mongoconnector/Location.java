package wififinder.mongoconnector;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "test")
public class Location {
    @Id
    private String id;
    private String name;
    private String address;
    private String geo;
    private String reviews;
    private String image;
    private String type;
    private String hours;
    private List<BusinessHours> hoursList;
    private String google;

    public List<BusinessHours> getHoursList() {
        return hoursList;
    }

    public void setHoursList(List<BusinessHours> hoursList) {
        this.hoursList = hoursList;
    }

    // Getter for 'yelp'
    public String getGoogle() {
        return google;
    }

    // Setter for 'yelp'
    public void setGoogle(String google) {
        this.google = google;
    }

    public String getHours() {
        return hours;
    }

    // Setter for 'yelp'
    public void setHours(String hours) {
        this.hours = hours;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGeo() {
        return geo;
    }

    public void setGeo(String geo) {
        this.geo = geo;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}