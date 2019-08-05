package mindly.repository;

import mindly.domain.Entry;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Entry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {

    @Query("select entry from Entry entry where entry.user.login = ?#{principal.username}")
    List<Entry> findByUserIsCurrentUser();

}
