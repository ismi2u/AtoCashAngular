import { CommonService } from 'src/app/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UiPathRobot } from '@uipath/robot';

@Injectable({
	providedIn: 'root',
})
export class RpaService {

	constructor(private http: HttpClient, private commonService: CommonService) {}

	triggerBot = async () => {

    try {
			UiPathRobot.init();
			const allProcess = await UiPathRobot.getProcesses();
			let process = allProcess.find((p) => p.name.includes('AtoCash'));
			const result = await process.start();
			if (result) {
				alert(result.retresult);
			}
		} catch (err) {
			console.log(err);
		}
	}
}
