import moment from 'moment';

import { assignObjectArrayValue, capitalizeFirstLetter } from '@/utils/global';

import type { GroupedTarget, Target } from '../models/target.models';

class TargetsService {
  public groupTargets(targets: Array<Target>): GroupedTarget {
    const currentWeek = moment().isoWeek();
    const nextWeek = currentWeek + 1;
    const newTargets = targets.reduce(
      (newTargetObject: GroupedTarget, currentTarget) => {
        if (moment(currentTarget.eventDate).isoWeek() === currentWeek) {
          newTargetObject = assignObjectArrayValue<Target>(
            newTargetObject,
            'Bieżący tydzień',
            currentTarget,
          );
        } else if (moment(currentTarget.eventDate).isoWeek() === nextWeek) {
          newTargetObject = assignObjectArrayValue<Target>(
            newTargetObject,
            'Następny tydzień',
            currentTarget,
          );
        } else {
          const eventMonth = moment(currentTarget.eventDate)
            .locale('pl')
            .startOf('month')
            .format('MMMM');
          const eventYear = moment(currentTarget.eventDate).year();
          const eventLabel = capitalizeFirstLetter(
            `${eventMonth} ${eventYear}`,
          );

          newTargetObject = assignObjectArrayValue<Target>(
            newTargetObject,
            eventLabel,
            currentTarget,
          );
        }

        return newTargetObject;
      },
      {},
    );

    return newTargets;
  }
}

export default new TargetsService();
