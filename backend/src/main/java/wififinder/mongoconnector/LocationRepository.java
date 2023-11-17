package wififinder.mongoconnector;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface LocationRepository extends MongoRepository<Location, String> { 
    @Query("{ 'geo': { $near: { $geometry: { type: 'Point', coordinates: [ ?0, ?1 ] } } }, 'type': 'private' }")
    List<Location> findPrivateLocations(double longitude, double latitude, Pageable pageable);

    @Query("{ 'geo': { $near: { $geometry: { type: 'Point', coordinates: [ ?0, ?1 ] } } }, 'type': 'public' }")
    List<Location> findPublicLocations(double longitude, double latitude, Pageable pageable);

    @Query("{ 'geo': { $near: { $geometry: { type: 'Point', coordinates: [ ?0, ?1 ] } } }, 'type': { $exists: true } }")
    List<Location> findAllLocations(double longitude, double latitude, Pageable pageable);
}

