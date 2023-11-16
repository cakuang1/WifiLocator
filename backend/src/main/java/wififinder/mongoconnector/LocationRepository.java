package wififinder.mongoconnector;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

    
public interface LocationRepository extends MongoRepository<Location, String> { 
    @Query("{ 'geo': { $near: { $geometry: { type: 'Point', coordinates: [ ?0, ?1 ] } } }, $or: [ { 'type': { $eq: ?2 } }, { 'type': { $exists: true, $ne: '' } } ] }")
    List<Location> findClosestLocations(double longitude, double latitude, String type, Pageable pageable);
}


