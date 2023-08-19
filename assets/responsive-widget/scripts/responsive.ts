import { _decorator, Component, Node, UITransform, Vec3, view, Widget } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('responsive')
export class responsive extends Component {

    private widget: Widget;
    start() {
        this.widget = this.node.getComponent(Widget);
        this.setResponsivePosition();
    }
    setResponsivePosition() {
        const canvasSize = view.getCanvasSize();
        const designSize = view.getDesignResolutionSize(); 

        const canvasAspectRatio = canvasSize.width / canvasSize.height;
        const designRatio = designSize.width / designSize.height;

        const differenceOfRatios = Math.abs(canvasAspectRatio - designRatio);
        const isSame = differenceOfRatios < 0.01;

        if (!isSame) {
            if (canvasAspectRatio > designRatio) {
                // update width value
                const factor = canvasSize.height / designSize.height;
                const actualDesignWidth = designSize.width * factor;
                const differenceWidth = (canvasSize.width - actualDesignWidth) / 2;
                const differenceWidthForDesign = differenceWidth / factor;
                if (this.widget.isAlignLeft) {
                    this.widget.left -= differenceWidthForDesign;
                } else if (this.widget.isAlignRight) {
                    this.widget.right -= differenceWidthForDesign;
                }
            } else if (canvasAspectRatio < designRatio) {
                // update height value
                const factor = canvasSize.width / designSize.width;
                const actualDesignHeight = designSize.height * factor;
                const differenceHeight = (canvasSize.height - actualDesignHeight) / 2;
                const differenceHeightForDesign = differenceHeight / factor;
                if (this.widget.isAlignTop) {
                    this.widget.top -= differenceHeightForDesign;
                } else if (this.widget.isAlignBottom) {
                    this.widget.bottom -= differenceHeightForDesign;
                }
            }
        }
    }

    update(deltaTime: number) {
        
    }
}