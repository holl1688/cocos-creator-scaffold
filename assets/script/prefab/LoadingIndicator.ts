import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingIndicator')
export class LoadingIndicator extends Component {
    @property(Node)
    private loading: Node = null; // 旋转图标

    private loading_rotate: number = 0; // 旋转角度

    start() {
        
    }

    update(dt: number) {
        this.loading_rotate += 220 * dt;
        this.loading.setRotationFromEuler(0, 0, -this.loading_rotate % 360);
        if (this.loading_rotate >= 360) {
            this.loading_rotate -= 360;
        }
    }
}

