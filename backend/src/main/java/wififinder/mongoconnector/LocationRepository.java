package wififinder.mongoconnector;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.mongodb.client.model.geojson.Point;



public interface LocationRepository extends MongoRepository<Location, String> {

    @Query("{ 'geo': { $near: { $geometry: { type: 'Point', coordinates: [ ?0, ?1 ] } } } }")
    List<Location> findClosestLocations(double longitude, double latitude, Pageable pageable);

    // Add another method for limiting the result
    List<Location> findTop8ByGeoNear(Point point, Pageable pageable);
}