import { admin } from './admin-types';
import { UpdateWaitingList } from '../../seaters-api/admin';

export function mapWaitingList(wl: admin.WaitingList): UpdateWaitingList {
    return Object.assign(wl, {
        distributionRate: wl.billingVariables.distributionRate,
        vatRate: wl.billingVariables.vatRate,
        minDistributionFee: wl.billingVariables.minDistributionFee,
        maxDistributionFee: wl.billingVariables.maxDistributionFee
    });
}